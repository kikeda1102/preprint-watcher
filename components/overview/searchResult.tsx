import { parseData } from '@/lib/actions';

export default async function searchResult() {

    const entries = await parseData();

    // 検索結果を表示
    return (
        entries.map((entry: any) => (
            console.log(entry.author),
            <div key={entry.id} >
                <h1 className="text-2xl font-bold">{entry.title} </h1>
                <p className="text-sm"> {entry.published} </p>
                {entry.author.map((author: any) => (
                    <span key={author.name} className="text-xl"> {author.name}, </span>
                ))

                }

                <p> {entry.summary} </p>
            </div>
        ))
    );
};
