export interface Book {
  id: number;
  title: string;
  author: string;
  archived: string;
}

export interface UpdateBookInput {
  id: number;
  input: Partial<Book>;
}

export interface Db {
  getBooks: () => Promise<Book[]>;
  getBookById: (id: number) => Promise<Book>;
  createBook: (book: Partial<Book>) => Promise<Book>;
  updateBook: ({ id, input }: UpdateBookInput) => Promise<Book>;
  deleteBook: (id: number) => Promise<Book>;
}
