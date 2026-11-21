# EC2 Book Store (Next.js)

The Next.js version of the bootcamp book store app. It shows which server
answered the request (the EC2 hostname) and a list of books.

## Pages

| Route    | What it shows                                  |
| -------- | ---------------------------------------------- |
| `/`      | Welcome page with the hostname of the server   |
| `/books` | The book list                                  |

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Run it in production (EC2)

```bash
npm ci
npm run build
PORT=3000 npm start
```

Next.js 16 needs Node.js 20.9 or newer.

## Branches

- `main`: the book list is hardcoded in `lib/books.ts`, no database needed.
- `week-4-rds-postgres`: reads and adds books in a PostgreSQL (RDS) database.
