import Link from "next/link";

export default function SidenavHeader() {
  return (
    <Link href="/dashboard" className="sticky top-5 z-10 mb-6 flex items-center justify-center bg-white pb-6">
      <h1 className="text-2xl font-semibold tracking-widest">Ayo Nugas</h1>
    </Link>
  );
}
