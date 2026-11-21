import type { Metadata } from "next";
import BookList from "@/components/book-list";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = {
  title: "Books",
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <>
      <h1 className="font-display text-4xl font-semibold">Books</h1>
      <p className="mt-2 mb-8 text-muted">
        {books.length} titles on the shelf.
      </p>
      <BookList books={books} />
    </>
  );
}
