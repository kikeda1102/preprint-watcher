import Link from 'next/link';
import AddKeywordForm from '@/components/overview/add-keyword-form';
import DeleteButton from '@/components/overview/delete-button';
import searchResult from '@/components/overview/searchResult';


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
            <h1 className="text-3xl font-bold mb-4">Overview</h1>

            <div className="font-bold mb-2 ml-2">{user.name}</div>
            {user.keywords.map((keyword) => (
                <div key={keyword.id} className="flex items-center mb-2">
                    <span className="mr-2 ml-2">{keyword.name}</span>
                    <DeleteButton keywordId={keyword.id} />
                </div>
            ))}

            <AddKeywordForm userId={userId} />

            {await searchResult()}

            <Link href={`/`} className="bg-blue-600 px-4 py-2 m-4 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
