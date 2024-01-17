'use server';
import { XMLParser } from 'fast-xml-parser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


async function fetchData() {
    const url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=2';
    const response = await fetch(url);
    const data = await response.status === 200 ? response.text() : 'error fetching data';
    return data;
}

export async function parseData() {
    try {
        const data = await fetchData();
        const parser = new XMLParser();
        const jsonData = parser.parse(data);
        const entries = jsonData.feed.entry || [];
        return entries;

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return [];
    }
}


export const addKeyword = async (userId: number, data: FormData) => {
    const keyword = data.get('addKeyword') as string;
    const keywordData = {
        userId: userId,
        name: keyword,
    };

    await prisma.keyword.create({ data: keywordData });

    revalidatePath('/');
    redirect('/');
};
