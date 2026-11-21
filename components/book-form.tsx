"use client";

import { useActionState } from "react";
import type { BookFormState } from "@/app/books/actions";

const initialState: BookFormState = { error: null };

const inputClass =
  "w-full rounded-md border border-line bg-card px-3 py-2 text-sm outline-none focus:border-accent";

type Props = {
  action: (prev: BookFormState, formData: FormData) => Promise<BookFormState>;
  submitLabel: string;
  pendingLabel: string;
  defaultTitle?: string;
  defaultAuthor?: string;
};

// One form for both adding and editing a book.
export default function BookForm({
  action,
  submitLabel,
  pendingLabel,
  defaultTitle,
  defaultAuthor,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mb-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="title"
          placeholder="Title"
          aria-label="Title"
          defaultValue={defaultTitle}
          required
          maxLength={255}
          className={inputClass}
        />
        <input
          name="author"
          placeholder="Author"
          aria-label="Author"
          defaultValue={defaultAuthor}
          required
          maxLength={255}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-md bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {pending ? pendingLabel : submitLabel}
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
