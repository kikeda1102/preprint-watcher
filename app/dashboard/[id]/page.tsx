import Link from 'next/link';
import AddKeywordForm from '@/components/dashboard/add-keyword-form';
import DeleteButton from '@/components/dashboard/delete-button';
import EditButton from '@/components/dashboard/edit-button';
import searchResult from '@/components/dashboard/searchResult';

export default async function Page({ params }: { params: { id: string } }) {
    const userId = parseInt(params.id, 10);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { keywords: true },
    });

    if (!user) {
        return <div>User Not Found.</div>;
    }

    return (
        <main className="my-8 mx-auto max-w-2xl">
            <div className="text-3xl font-bold mb-4 ml-2">{user.name} &#39;s dashboard</div>
            <div className="flex flex-wrap items-start mb-4 ml-2">
                <span className="text-lg font-semibold mr-3 mt-3">Keywords:</span>
                {user.keywords.map((keyword) => (
                    <div key={keyword.id} className="flex items-center bg-gray-100 p-2 rounded mb-2 mr-2">
                        <span className="text-base font-semibold">{keyword.name}</span>
                        <div className="flex space-x-2 ml-2">
                            <EditButton keywordId={keyword.id} currentKeyword={keyword.name} />
                            <DeleteButton keywordName={keyword.name} keywordId={keyword.id} />
                        </div>
                    </div>
                ))}
            </div>

            <AddKeywordForm userId={userId} />

            {await searchResult(user.keywords.map((keyword) => keyword.name))}

            <Link href={`/`} className="bg-blue-600 px-4 py-2 m-4 rounded-lg text-sm text-white inline-block">
                Back
            </Link>
        </main>
    );
}
