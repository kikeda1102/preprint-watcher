import Link from "next/link";


export default function Page() {
    return <Link href='/'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Back to Home </button>
    </Link>;
}
