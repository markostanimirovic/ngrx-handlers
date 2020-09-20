import * as fromBooks from './books.handlers';

const BooksActions = fromBooks.actions;
export { fromBooks, BooksActions };

export interface BooksAppState {
  [fromBooks.featureName]: fromBooks.State;
}
