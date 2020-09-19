import * as fromBooks from './books.handlers';

export interface BooksAppState {
  [fromBooks.featureName]: fromBooks.State;
}

const BooksActions = fromBooks.actions;
export { fromBooks, BooksActions };
