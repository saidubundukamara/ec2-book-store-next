# EC2 Book Store (Next.js)

The Next.js version of the bootcamp book store app. It shows which server
answered the request (the EC2 hostname) and a list of books stored in a
PostgreSQL database (Amazon RDS).

## Pages

| Route    | What it shows                                  |
| -------- | ---------------------------------------------- |
| `/`       | Welcome page with the hostname and database status |
| `/books`  | The book list from the database, with add, edit and delete |
| `/books/[id]/edit` | Form to change a book's title and author    |
| `/health` | Health check for the load balancer (JSON)          |

## Database settings

The app reads these environment variables when it starts:

| Variable      | Default     | Notes                                          |
| ------------- | ----------- | ---------------------------------------------- |
| `DB_HOST`     | (none)      | RDS endpoint. Without it the app runs with no database |
| `DB_PORT`     | `5432`      |                                                |
| `DB_USER`     | (none)      |                                                |
| `DB_PASSWORD` | (none)      |                                                |
| `DB_NAME`     | `bookstore` | The database must already exist                |
| `DB_SSL`      | on          | Set to `false` for a local PostgreSQL without SSL |

There is no login: anyone who can open the site can add, edit and delete
books.

The `books` table is created automatically the first time the app talks to
the database.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev
```

Open http://localhost:3000.

## Run it in production (EC2)

```bash
npm ci
npm run build
PORT=3000 DB_HOST=your-rds-endpoint DB_USER=postgres DB_PASSWORD=... DB_NAME=bookstore npm start
```

The security group of the RDS instance must allow port 5432 from the EC2
instance.

Next.js 16 needs Node.js 20.9 or newer.

## Branches

- `main`: the book list is hardcoded in `lib/books.ts`, no database needed.
- `week-4-rds-postgres`: reads and adds books in a PostgreSQL (RDS) database.
