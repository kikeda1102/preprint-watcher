import Link from "next/link";
import prisma from '@/lib/prisma';

export default async function Page() {
  const users = await prisma.user.findMany({ include: { keywords: true } });

  return users.map((user) => (
    <Link href={`/overview/${user.id}`} key={user.id}>
      <div style={{ fontWeight: 'bold' }}>{user.name}</div>
      {user.keywords.map((keyword, index) => (
        <span key={keyword.id}>
          {index > 0 && ' '}
          {keyword.name}
        </span>
      ))}
    </Link>
  ));
}
