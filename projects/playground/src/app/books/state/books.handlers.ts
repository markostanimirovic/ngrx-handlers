import { Book } from '../core/models/book';
import { combineHandlers, plain, withPayload } from 'ngrx-handlers';

export const featureName = 'books';

export interface State {
  books: Book[];
  loading: boolean;
  searchTerm: string;
}

export const initialState: State = {
  books: [],
  loading: false,
  searchTerm: '',
};

export const { actions, reducer } = combineHandlers(initialState, featureName, {
  fetchBooks: state => ({ ...state, loading: true }),
  fetchBooksSuccess: (state, { books }: { books: Book[] }) => ({ ...state, books, loading: false }),
  fetchBooksError: state => ({ ...state, books: [], loading: false }),
  updateSearchTerm: (state, { searchTerm }: { searchTerm: string }) => ({ ...state, searchTerm }),
  showCreateBookDialog: plain(),
  createBook: withPayload<{ book: Book }>(),
});
