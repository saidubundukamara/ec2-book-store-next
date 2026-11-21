"use server";

import { refresh } from "next/cache";
import { addBook } from "@/lib/books";
import { isDbConfigured } from "@/lib/db";

export type AddBookState = { error: string | null };

export async function addBookAction(
  _prev: AddBookState,
  formData: FormData,
): Promise<AddBookState> {
  if (!isDbConfigured()) {
    return { error: "No database configured." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();

  if (!title || !author) {
    return { error: "Title and author are required." };
  }
  if (title.length > 255 || author.length > 255) {
    return { error: "Title and author must be 255 characters or fewer." };
  }

  try {
    await addBook(title, author);
  } catch (err) {
    console.error(err);
    return { error: "Could not save the book. Check the database connection." };
  }

  refresh();
  return { error: null };
}
