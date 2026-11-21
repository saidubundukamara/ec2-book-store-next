import { getDb } from "@/lib/db";

export type Book = {
  id: number;
  title: string;
  author: string;
};

export async function getBooks(): Promise<Book[]> {
  const db = await getDb();
  const { rows } = await db.query<Book>(
    "SELECT id, title, author FROM books ORDER BY id DESC",
  );
  return rows;
}

export async function addBook(title: string, author: string) {
  const db = await getDb();
  await db.query("INSERT INTO books (title, author) VALUES ($1, $2)", [
    title,
    author,
  ]);
}

export async function getBook(id: number): Promise<Book | null> {
  const db = await getDb();
  const { rows } = await db.query<Book>(
    "SELECT id, title, author FROM books WHERE id = $1",
    [id],
  );
  return rows[0] ?? null;
}

export async function updateBook(id: number, title: string, author: string) {
  const db = await getDb();
  await db.query("UPDATE books SET title = $1, author = $2 WHERE id = $3", [
    title,
    author,
    id,
  ]);
}

export async function deleteBook(id: number) {
  const db = await getDb();
  await db.query("DELETE FROM books WHERE id = $1", [id]);
}
