import Link from "next/link";
import ServedBy from "@/components/served-by";

export default function Home() {
  return (
    <section className="py-10">
      <ServedBy />
      <h1 className="mt-6 max-w-2xl font-display text-5xl leading-tight font-semibold sm:text-6xl">
        Hello world from the EC2 Book Store
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        A small Next.js app deployed on AWS EC2. The badge above shows which
        server answered your request.
      </p>
      <Link
        href="/books"
        className="mt-8 inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Browse the books
      </Link>
    </section>
  );
}
