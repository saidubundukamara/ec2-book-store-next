"use client";

import { useActionState } from "react";
import { addBookAction, type AddBookState } from "@/app/books/actions";

const initialState: AddBookState = { error: null };

const inputClass =
  "w-full rounded-md border border-line bg-card px-3 py-2 text-sm outline-none focus:border-accent";

export default function AddBookForm() {
  const [state, formAction, pending] = useActionState(
    addBookAction,
    initialState,
  );

  return (
    <form action={formAction} className="mb-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="title"
          placeholder="Title"
          aria-label="Title"
          required
          maxLength={255}
          className={inputClass}
        />
        <input
          name="author"
          placeholder="Author"
          aria-label="Author"
          required
          maxLength={255}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-md bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Adding..." : "Add book"}
        </button>
      </div>
      {state.error && (
        <p role="alert" className="mt-2 text-sm text-accent">
          {state.error}
        </p>
      )}
    </form>
  );
}
