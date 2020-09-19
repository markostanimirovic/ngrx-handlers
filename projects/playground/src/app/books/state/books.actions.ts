import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book';

export const fetchBooks = createAction('[Books] Fetch Books');
export const fetchBooksSuccess = createAction(
  '[Books] Fetch Books Success',
  props<{ books: Book[] }>(),
);
export const fetchBooksError = createAction('[Books] Fetch Books Error');

export const updateSearchTerm = createAction(
  '[Books] Update Search Term',
  props<{ searchTerm: string }>(),
);
