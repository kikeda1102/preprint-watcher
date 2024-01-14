import Link from "next/link";
import prisma from '@/lib/prisma';

export default async function Page() {
  const users = await prisma.user.findMany();

  return users.map((user) => (
    <Link href={`/overview/${user.id}`} key={user.id}>
      {user.name}
    </Link>
  ));
}
