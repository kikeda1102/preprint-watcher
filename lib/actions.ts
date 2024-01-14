'use server';
import { XMLParser } from 'fast-xml-parser';

export async function fetchArxivData() {
    const url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=2';
    const response = await fetch(url);
    const data = await response.status === 200 ? response.text() : 'error fetching data';
    // console.log(data);
    return data;
}

export async function parseArxivData() {
    const data = await fetchArxivData();
    const parser = new XMLParser();
    const jsonData = parser.parse(data);
    return jsonData;
}
