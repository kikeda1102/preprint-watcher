import Link from 'next/link';
import searchResult from '@/components/overview/searchResult';
import addKeyword from '@/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <main>
            <h1>Overview</h1>
            <p>Viewing user {id}</p>

            <form action={addKeyword}>
                <label htmlFor="search" className="text-sm font-bold mb-2">
                    Search
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 p-2 mb-4 rounded-lg appearance-none focus:outline-none focus:border-gray-600"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg py-2 px-4 text-sm hover:bg-blue-700"
                >
                    Search
                </button>
            </form>
            {await searchResult()}

            <p> TODO: 登録済みのキーワード一覧を表示 </p>
            <Link href={`/`} className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
