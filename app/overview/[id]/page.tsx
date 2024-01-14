import Link from 'next/link';
import searchResult from '@/components/overview/searchResult';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <main>
            <h1>Overview</h1>
            <p>Viewing user {id}</p>

            {await searchResult()}

            <p> TODO: 登録済みのキーワード一覧を表示 </p>
            <Link href={`/`} className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
