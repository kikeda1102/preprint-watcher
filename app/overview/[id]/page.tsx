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
        <main>
            <h1>Overview</h1>

            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            {user.keywords.map((keyword, index) => (
                <div key={keyword.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>{keyword.name}</span>
                    <DeleteButton keywordId={keyword.id} />
                </div>
            ))}

            <AddKeywordForm userId={userId} />

            {await searchResult()}

            <p> TODO: 登録済みのキーワード一覧を表示 </p>
            <Link href={`/`} className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white">
                Back
            </Link>
        </main>
    );
}
