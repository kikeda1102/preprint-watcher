import Link from 'next/link';
import { parseData } from '@/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const displayEntries = async () => {
        const entries = await parseData();

        // 検索結果を表示
        return entries.map((entry: any) => (
            <div key={entry.id}>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
            </div>
        ));
    };

    return (
        <main>
            <h1>Overview</h1>
            <p>Viewing user {id}</p>

            {await displayEntries()}

            <p> TODO: 登録済みのキーワード一覧を表示 </p>
            <Link href={`/`} className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
