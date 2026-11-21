import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import AddBookForm from "@/components/add-book-form";
import BookList from "@/components/book-list";
import { getBooks, type Book } from "@/lib/books";
import { isDbConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "Books",
};

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-card p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  );
}

// Runs on every request: the database settings only exist on the server at
// run time, and the book list changes whenever someone adds a book.
async function Shelf() {
  await connection();

  if (!isDbConfigured()) {
    return (
      <Notice title="No database configured">
        Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME, then restart the app.
      </Notice>
    );
  }

  let books: Book[];
  try {
    books = await getBooks();
  } catch (err) {
    console.error(err);
    return (
      <Notice title="Database error">
        Could not reach the database. Check the settings and the security
        group, then reload the page.
      </Notice>
    );
  }

  return (
    <>
      <AddBookForm />
      <BookList books={books} />
    </>
  );
}

export default function BooksPage() {
  return (
    <>
      <h1 className="mb-8 font-display text-4xl font-semibold">Books</h1>
      <Suspense fallback={<p className="text-muted">Loading books...</p>}>
        <Shelf />
      </Suspense>
    </>
  );
}
