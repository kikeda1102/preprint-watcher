'use server';
import { XMLParser } from 'fast-xml-parser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/** キーワードからクエリを作成 */
export const createQuery = (keywords: string[]) => {
    const query = keywords.join('+OR+');
    return query;
};


/** データ取得 */
async function fetchArxivData() {
    const url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=7';
    const response = await fetch(url);
    const data = await response.status === 200 ? response.text() : 'error fetching data';
    return data;
}

/** Arxiv APIから取得したデータをパース */
export async function parseArxivData() {
    try {
        const data = await fetchArxivData();
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

    revalidatePath('/');
    // redirect('/');
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
