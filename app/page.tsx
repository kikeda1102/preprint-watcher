import Link from "next/link";
import prisma from '@/lib/prisma';

export default async function Page() {
  const users = await prisma.user.findMany({ include: { keywords: true } });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Link href={`/overview/${user.id}`} key={user.id}>
          <div className="bg-white p-4 rounded-md shadow-md m-5 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <div className="flex flex-wrap">
              {user.keywords.map((keyword, index) => (
                <span key={keyword.id} className="mr-2 mb-2 px-2 py-1 bg-blue-500 text-white rounded-full">
                  {keyword.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
