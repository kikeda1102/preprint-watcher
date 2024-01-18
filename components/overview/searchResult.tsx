import { parseArxivData } from '@/lib/actions';

export default async function searchResult() {

    const entries = await parseArxivData();

    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    // 検索結果を表示
    return (
        <>
            <div className="font-bold m-2">
                found {entries.length} papers.
            </div>

            {entries.map((entry: any) => (
                // console.log(entry.author),
                <div key={entry.id} className='m-10'>
                    <a href={`${entry.id}`} target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer">
                        {entry.id}
                    </a>
                    <h1 className="text-2xl font-bold mb-2">{entry.title}</h1>
                    <p className="text-sm mb-2">{formatDate(entry.published)}</p>
                    {
                        // 著者が複数の場合と単数の場合で型が違うため場合分けが必要
                        Array.isArray(entry.author) ? (
                            entry.author.map((person: any, index: number) => (
                                <span key={person.name} className="text-xl">
                                    {person.name}
                                    {index < entry.author.length - 1 && ', '}
                                </span>
                            ))
                        ) : (
                            <span className="text-xl">
                                {entry.author.name}
                            </span>
                        )
                    }
                    <div>

                        {entry.summary.length > 200
                            ? entry.summary.slice(0, 500) + '...'
                            : entry.summary
                        }

                    </div>
                </div>
            ))}
        </>
    );
};
