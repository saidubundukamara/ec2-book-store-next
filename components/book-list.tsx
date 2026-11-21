import type { Book } from "@/lib/books";

export default function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return <p className="text-muted">No books yet.</p>;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li
          key={book.id}
          className="rounded-lg border border-line border-l-4 border-l-accent bg-card p-5"
        >
          <h2 className="font-display text-lg leading-snug font-semibold">
            {book.title}
          </h2>
          <p className="mt-1 text-sm text-muted">by {book.author}</p>
        </li>
      ))}
    </ul>
  );
}
