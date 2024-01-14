// page.tsx
import Link from 'next/link';
import { parseArxivData } from '@/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    // データの取得とパース
    const fetchData = async () => {
        try {
            const arxivData = await parseArxivData();
            const entries = arxivData?.feed?.entry || [];
            return entries;
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            // エラーが発生した場合の処理をここに追加
            return [];
        }
    };

    const displayEntries = async () => {
        const entries = await fetchData();

        // 検索結果を表示
        return entries.map((entry: any) => (
            <div key={entry.id}>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                {/* 他の情報も必要に応じて表示 */}
            </div>
        ));
    };

    return (
        <main>
            <h1>Overview</h1>
            <p>Viewing user {id}</p>

            {/* 検索結果を表示 */}
            {await displayEntries()}

            <p> TODO: 登録済みのキーワード一覧を表示 </p>
            <Link href={`/`} className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
