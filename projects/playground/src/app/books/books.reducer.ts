import { mergeReducers } from 'ngrx-handlers';
import { booksEffectsReducer } from './handlers/books-effects.handlers';
import { booksPageReducer } from './handlers/books-page.handlers';

export const booksReducer = mergeReducers(booksPageReducer, booksEffectsReducer);
