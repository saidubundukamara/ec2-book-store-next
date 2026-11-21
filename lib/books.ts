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
