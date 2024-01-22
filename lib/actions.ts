'use server';
import { XMLParser } from 'fast-xml-parser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SearchQuery } from '@/lib/search-query';



/** データ取得 */
async function fetchArxivData(query: SearchQuery) {
    const queryUrl = query.getQueryUrl();
    const response = await fetch(queryUrl);

    if (!response.ok) {
        console.log(`queryUrl: ${queryUrl}`);
        throw new Error('Error fetching data');
    }

    const data = await response.text();
    return data;
}

/** Arxiv APIから取得したデータをパース */
export async function parseArxivData(query: SearchQuery) {
    try {
        const data = await fetchArxivData(query);
        const parser = new XMLParser();
        const jsonData = parser.parse(data);
        const entries = jsonData.feed.entry || [];
        return entries;
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        throw error;
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
        const result = await prisma.keyword.create({ data: keywordData });
        console.log(result);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    errors: {
                        name: ['キーワードが重複しています'],
                    },
                    message: 'Failed to add keyword',
                }
            } else {
                return {
                    errors: {
                        name: ['予期しないエラーが発生しました'],
                    },
                    message: 'Failed to add keyword',
                }
            }
        } else {
            return {
                errors: {
                    name: ['予期しないエラーが発生しました'],
                },
                message: 'Failed to add keyword',
            }
        }
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

/** sortByを変更 */
export async function updateSortBy(userId: number, sortBy: string) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            sortBy: sortBy,
        },
    });
    console.log('sortBy: ', sortBy);
    revalidatePath(`/dashboard/${userId}`);
}

/** sortOrderを変更 */
export async function updateSortOrder(userId: number, sortOrder: string) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            sortOrder: sortOrder,
        },
    });
    console.log('sortOrder: ', sortOrder);
    revalidatePath(`/dashboard/${userId}`);
}


/** maxResultsを変更 */
export const updateMaxResults = async (userId: number, maxResults: number) => {
    try {
        // Prisma の型である IntFieldUpdateOperationsInput を使ってデータを更新
        await prisma.user.update({
            where: { id: userId },
            data: { maxResults: maxResults },
        });

        // 成功した場合の処理（例: メッセージをログに出力）
        console.log(`Successfully updated maxResults for user ${userId} to ${maxResults}`);
        revalidatePath(`/dashboard/${userId}`);
    } catch (error) {
        // エラーが発生した場合の処理
        console.error('Error updating maxResults:', error);
        throw error; // 例外を再スローするか、適切な処理を行う
    }
};
