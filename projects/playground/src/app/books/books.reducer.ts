import { mergeReducers } from 'ngrx-handlers';
import { booksApiReducer } from './handlers/books-api.handlers';
import { booksPageReducer } from './handlers/books-page.handlers';

export const booksReducer = mergeReducers(booksPageReducer, booksApiReducer);
