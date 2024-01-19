import { parseArxivData } from '@/lib/actions';
import Link from 'next/link';

export default async function searchResult(keywords: string[]) {
    const entries = await parseArxivData(keywords);

    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    // 検索結果を表示
    return (
        <>
            {entries.length > 0 ? (
                <>
                    <div className="font-bold m-4">
                        {entries.length} papers found.
                    </div>

                    {entries.map((entry: any) => (
                        <Link href={entry.id} key={entry.id} target="_blank">
                            <div key={entry.id} className='m-6 ml-10 p-6 border rounded bg-white shadow-md'>
                                {/* <a href={`${entry.id}`} target="_blank" className="text-blue-500 hover:underline" rel="noopener noreferrer"> */}
                                {/* {entry.id} */}
                                {/* </a> */}
                                <h1 className="text-2xl font-bold mb-2 mt-2">{entry.title}</h1>
                                <p className="text-sm mb-2">{formatDate(entry.published)}</p>
                                <div className="mb-2">
                                    {Array.isArray(entry.author) ? (
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
                                    )}
                                </div>
                                <div className="text-gray-700">
                                    {entry.summary.length > 200
                                        ? entry.summary.slice(0, 200) + '...'
                                        : entry.summary
                                    }
                                </div>
                            </div>
                        </Link>

                    ))}
                </>
            ) : (
                <div className="font-bold m-4">
                    No Papers found.
                </div>
            )}
        </>
    );
};
