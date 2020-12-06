import { createFeatureSelector } from '@ngrx/store';
import { booksFeatureName, BooksState } from './books.state';

export const selectBooks = createFeatureSelector<BooksState>(booksFeatureName);
