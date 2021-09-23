import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import { booksFeatureName, booksInitState, BooksState } from './books.state';

export const selectBooksState = createFeatureSelector<BooksState>(booksFeatureName);
export const { selectBooks, selectLoading } = createChildSelectors(
  selectBooksState,
  booksInitState,
);

export const selectBooksPageViewModel = createSelector(
  selectBooks,
  selectLoading,
  (books, loading) => ({ books, loading }),
);
