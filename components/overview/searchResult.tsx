import { parseData } from '@/lib/actions';

export default async function searchResult() {

    const entries = await parseData();

    // 検索結果を表示
    return (
        entries.map((entry: any) => (
            <>
                <div key={entry.id} >
                    <h3>{entry.title} </h3>
                    < p > {entry.summary} </p>
                </div>

            </>
        ))
    );
};
