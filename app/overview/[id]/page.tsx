import Link from 'next/link';
import searchResult from '@/components/overview/searchResult';
import { addKeyword } from '@/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
    const userId = parseInt(params.id, 10);

    return (
        <main>
            <h1>Overview</h1>
            <p>Viewing user {userId}</p>

            <form className="flex items-center"
                action={addKeyword}
            >
                <label htmlFor="addKeyword" className="text-sm font-bold m-2">
                    Add Keyword
                </label>
                <input
                    id="addKeyword"
                    name="addKeyword"
                    type="text"
                    className="border border-gray-300 p-2 m-2 rounded-lg appearance-none focus:outline-none focus:border-gray-600"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg py-2 px-4 m-2 text-sm hover:bg-blue-700"
                >
                    Add Keyword
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
