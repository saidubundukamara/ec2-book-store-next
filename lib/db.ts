import { Pool } from "pg";

// Database settings come from environment variables set on the server
// (the EC2 user data). If DB_HOST is not set the app still runs, it just
// has no books to show.
function createPool() {
  return new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "bookstore",
    max: 5,
    // RDS PostgreSQL requires an encrypted connection by default.
    // Set DB_SSL=false for a local PostgreSQL that has no SSL.
    ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
  });
}

// Keep one pool for the whole server process (and across dev hot reloads).
const globalForDb = globalThis as unknown as {
  pool?: Pool;
  tableReady?: Promise<void>;
};

export function isDbConfigured() {
  return Boolean(process.env.DB_HOST);
}

// Returns the pool, creating the books table the first time it is used.
export async function getDb() {
  if (!isDbConfigured()) {
    throw new Error("No database configured");
  }

  const pool = (globalForDb.pool ??= createPool());

  globalForDb.tableReady ??= pool
    .query(
      `CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`,
    )
    .then(() => undefined);

  try {
    await globalForDb.tableReady;
  } catch (err) {
    // Forget the failure so the next request tries again.
    globalForDb.tableReady = undefined;
    throw err;
  }

  return pool;
}
