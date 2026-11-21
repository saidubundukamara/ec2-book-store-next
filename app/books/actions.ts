"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { addBook, deleteBook, updateBook } from "@/lib/books";
import { isDbConfigured } from "@/lib/db";

export type BookFormState = { error: string | null };

// Reads and checks the title and author fields shared by add and edit.
function readBookFields(
  formData: FormData,
): { title: string; author: string; error: null } | { error: string } {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();

  if (!title || !author) {
    return { error: "Title and author are required." };
  }
  if (title.length > 255 || author.length > 255) {
    return { error: "Title and author must be 255 characters or fewer." };
  }
  return { title, author, error: null };
}

// Create
export async function addBookAction(
  _prev: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  if (!isDbConfigured()) {
    return { error: "No database configured." };
  }

  const fields = readBookFields(formData);
  if (fields.error !== null) return { error: fields.error };

  try {
    await addBook(fields.title, fields.author);
  } catch (err) {
    console.error(err);
    return { error: "Could not save the book. Check the database connection." };
  }

  refresh();
  return { error: null };
}

// Update. The id is bound on the edit page, the rest comes from the form.
export async function updateBookAction(
  id: number,
  _prev: BookFormState,
  formData: FormData,
): Promise<BookFormState> {
  if (!isDbConfigured()) {
    return { error: "No database configured." };
  }

  const fields = readBookFields(formData);
  if (fields.error !== null) return { error: fields.error };

  try {
    await updateBook(id, fields.title, fields.author);
  } catch (err) {
    console.error(err);
    return { error: "Could not save the book. Check the database connection." };
  }

  redirect("/books");
}

// Delete. The id comes from a hidden field next to the Delete button.
export async function deleteBookAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id < 1) return;

  await deleteBook(id);
  refresh();
}
