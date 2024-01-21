'use server';
import { XMLParser } from 'fast-xml-parser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

/** キーワードからクエリを作成 */
export const createQuery = (keywords: string[]) => {
    const baseUrl = 'http://export.arxiv.org/api/query';
    const queryUrl = baseUrl + '?search_query=' + keywords.join('+OR+');
    return queryUrl;
};


/** データ取得 */
async function fetchArxivData(keywords: string[]) {
    const queryUrl = createQuery(keywords);
    const response = await fetch(queryUrl);
    const data = await response.status === 200 ? response.text() : 'error fetching data';
    return data;
}

/** Arxiv APIから取得したデータをパース */
export async function parseArxivData(keywords: string[]) {
    try {
        const data = await fetchArxivData(keywords);
        const parser = new XMLParser();
        const jsonData = parser.parse(data);
        const entries = jsonData.feed.entry || [];
        return entries;

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return [];
    }
}

// zod schema
const FormSchema = z.object({
    name: z.string().min(1, { message: 'キーワードを入力してください' }),
})

export type State = {
    errors?: {
        name?: string[];
    };
    message?: string | null;
};

/** キーワードをCreate */
export async function addKeyword(userId: number, prevState: State, formData: FormData) {
    const validatedField = FormSchema.safeParse({
        name: formData.get('addKeyword'),
    });

    if (!validatedField.success) {
        return {
            errors: validatedField.error.flatten().fieldErrors,
            message: 'Failed to add keyword',
        };
    }

    // Prepare data for insertion into DB
    const keywordData = {
        userId: userId,
        name: validatedField.data.name,
    };

    // Insert data into
    try {
        await prisma.keyword.create({ data: keywordData });
    } catch (error) {
        return {
            message: 'Failed to add keyword',
        };
    }
    revalidatePath(`/dashboard/${userId}`);
    redirect(`/dashboard/${userId}`);
};

/** キーワードをEdit */
export const editKeyword = async (keywordId: number, keyword: string) => {
    const keywordData = {
        id: keywordId,
        name: keyword,
    };

    await prisma.keyword.update({
        where: {
            id: keywordId,
        },
        data: keywordData,
    });

    revalidatePath('/');
};


/** キーワードをDelete */
export const deleteKeyword = async (keywordId: number) => {
    await prisma.keyword.delete({
        where: {
            id: keywordId,
        },
    });
    revalidatePath('/');
};
