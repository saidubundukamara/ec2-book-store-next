import Link from "next/link";
import { deleteBookAction } from "@/app/books/actions";
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
          className="flex flex-col rounded-lg border border-line border-l-4 border-l-accent bg-card p-5"
        >
          <h2 className="font-display text-lg leading-snug font-semibold">
            {book.title}
          </h2>
          <p className="mt-1 mb-4 text-sm text-muted">by {book.author}</p>
          <div className="mt-auto flex gap-4 text-sm">
            <Link
              href={`/books/${book.id}/edit`}
              className="font-medium hover:text-accent"
            >
              Edit
            </Link>
            <form action={deleteBookAction}>
              <input type="hidden" name="id" value={book.id} />
              <button
                type="submit"
                aria-label={`Delete ${book.title}`}
                className="cursor-pointer font-medium text-accent hover:underline"
              >
                Delete
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
