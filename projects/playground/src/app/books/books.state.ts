import { Book } from './book.model';

export const booksFeatureName = 'books';

export interface BooksState {
  books: Book[];
  loading: boolean;
  searchTerm: string;
}

export const booksInitState: BooksState = {
  books: [],
  loading: false,
  searchTerm: '',
};

export interface BooksAppState {
  [booksFeatureName]: BooksState;
}
