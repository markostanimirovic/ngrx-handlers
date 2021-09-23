import { combineHandlers } from 'ngrx-handlers';
import { booksInitState } from '../books.state';
import { Book } from '../book.model';

export const [booksApiActions, booksApiReducer] = combineHandlers(booksInitState, 'booksApi', {
  fetchBooksSuccess: (state, { books }: { books: Book[] }) => ({
    ...state,
    books,
    loading: false,
  }),
  fetchBooksError: state => ({ ...state, books: [], loading: false }),
});
