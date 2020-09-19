import { Book } from '../models/book';
import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';

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

export const reducer = createReducer(
  initialState,
  on(BooksActions.fetchBooks, state => ({ ...state, loading: true })),
  on(BooksActions.fetchBooksSuccess, (state, { books }) => ({ ...state, books, loading: false })),
  on(BooksActions.fetchBooksError, state => ({ ...state, books: [], loading: false })),
  on(BooksActions.updateSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
);
