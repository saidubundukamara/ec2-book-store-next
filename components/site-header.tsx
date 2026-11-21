import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl font-semibold">
          EC2 Book Store
        </Link>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="hover:text-accent">
              Books
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
