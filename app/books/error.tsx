"use client"; // Error boundaries must be Client Components

// Shown when something under /books fails unexpectedly, for example a
// delete while the database is unreachable.
export default function BooksError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="rounded-lg border border-line bg-card p-5">
      <h2 className="font-display text-lg font-semibold">Something went wrong</h2>
      <p className="mt-1 text-sm text-muted">
        The database may be unreachable. Nothing was changed.
      </p>
      <button
        onClick={() => retry()}
        className="mt-4 cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
