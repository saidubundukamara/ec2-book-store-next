import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { updateBookAction } from "@/app/books/actions";
import BookForm from "@/components/book-form";
import Notice from "@/components/notice";
import { getBook, type Book } from "@/lib/books";
import { isDbConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit book",
};

async function EditBook({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) notFound();

  if (!isDbConfigured()) {
    return (
      <Notice title="No database configured">
        Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME, then restart the app.
      </Notice>
    );
  }

  let book: Book | null;
  try {
    book = await getBook(id);
  } catch (err) {
    console.error(err);
    return (
      <Notice title="Database error">
        Could not reach the database. Check the settings and the security
        group, then reload the page.
      </Notice>
    );
  }
  if (!book) notFound();

  return (
    <BookForm
      action={updateBookAction.bind(null, book.id)}
      submitLabel="Save changes"
      pendingLabel="Saving..."
      defaultTitle={book.title}
      defaultAuthor={book.author}
    />
  );
}

export default function EditBookPage({ params }: PageProps<"/books/[id]/edit">) {
  return (
    <>
      <Link href="/books" className="text-sm text-muted hover:text-accent">
        Back to books
      </Link>
      <h1 className="mt-3 mb-8 font-display text-4xl font-semibold">Edit book</h1>
      <Suspense fallback={<p className="text-muted">Loading book...</p>}>
        <EditBook params={params} />
      </Suspense>
    </>
  );
}
