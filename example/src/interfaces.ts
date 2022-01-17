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
