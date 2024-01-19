'use server';
import { XMLParser } from 'fast-xml-parser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

/** キーワードをCreate */
export const addKeyword = async (userId: number, data: FormData) => {
    const keyword = data.get('addKeyword') as string;
    const keywordData = {
        userId: userId,
        name: keyword,
    };

    await prisma.keyword.create({ data: keywordData });

    revalidatePath(`/overview/${userId}`);
    // redirect('/');
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
