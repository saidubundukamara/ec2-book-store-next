export type Book = {
  id: number;
  title: string;
  author: string;
};

// The catalogue is hardcoded on this branch. The database branch replaces
// this list with rows read from PostgreSQL.
const books: Book[] = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 2, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" },
  { id: 3, title: "The Memory of Love", author: "Aminatta Forna" },
  { id: 4, title: "A Long Way Gone", author: "Ishmael Beah" },
  { id: 5, title: "The Phoenix Project", author: "Gene Kim" },
  { id: 6, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
];

export async function getBooks(): Promise<Book[]> {
  return books;
}
