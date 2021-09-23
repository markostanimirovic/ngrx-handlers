# 🕹️ NgRx Handlers

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM](https://img.shields.io/npm/v/ngrx-handlers)](https://www.npmjs.com/package/ngrx-handlers)
[![Build Status](https://travis-ci.org/markostanimirovic/ngrx-handlers.svg?branch=master)](https://travis-ci.org/markostanimirovic/ngrx-handlers)
[![Coverage Status](https://coveralls.io/repos/github/markostanimirovic/ngrx-handlers/badge.svg?branch=master)](https://coveralls.io/github/markostanimirovic/ngrx-handlers)
[![Downloads](https://img.shields.io/npm/dt/ngrx-handlers)](https://npmcharts.com/compare/ngrx-handlers?interval=30)

**NgRx Plugin for Generating Actions and Reducer Based on the Handler Map**

## ☝️ Why to use NgRx Handlers?

- Because it's boring to write action types manually
- Because you don't need to write too much code for simple functionality
- Because barrels and `import * as Actions` are no longer needed
- Because unlike other similar plugins, NgRx Handlers keep NgRx look and feel

## 🚀 Getting Started

### 🔧 Installation

NPM: `npm install ngrx-handlers`

Yarn: `yarn add ngrx-handlers`

### ⚡ Usage

**NgRx Actions and Reducer**

```typescript
// books-page.actions.ts
export const enter = createAction('[Books Page] Enter');
export const search = createAction('[Books Page] Search', props<{ searchTerm: string }>());
export const selectBook = createAction(
  '[Books Page] Select Book',
  props<{ selectedBookId: number }>(),
);

// books-api.actions.ts
export const fetchBooksSuccess = createAction(
  '[Books API] Fetch Books Success',
  props<{ books: Book[] }>(),
);
export const fetchBooksError = createAction('[Books API] Fetch Books Error');

// books.reducer.ts
import * as BooksPageActions from './actions/books-page.actions';
import * as BooksApiActions from './actions/books-api.actions';

export const reducer = createReducer(
  initBooksState,
  on(BooksPageActions.enter, state => ({ ...state, searchTerm: '', loading: true })),
  on(BooksPageActions.search, (state, { searchTerm }) => ({ ...state, searchTerm, loading: true })),
  on(BooksPageActions.selectBook, (state, { selectedBookId }) => ({
    ...state,
    selectedBookId,
  })),
  on(BooksApiActions.fetchBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
  })),
  on(BooksApiActions.fetchBooksError, state => ({ ...state, books: [], loading: false })),
);
```

**NgRx Handlers**

```typescript
// books-page.handlers.ts
export const [BooksPageActions, booksPageReducer] = combineHandlers(initBooksState, 'booksPage', {
  enter: state => ({ ...state, searchTerm: '', loading: true }),
  search: (state, { searchTerm }: { searchTerm: string }) => ({
    ...state,
    searchTerm,
    loading: true,
  }),
  selectBook: (state, { selectedBookId }: { selectedBookId: number }) => ({
    ...state,
    selectedBookId,
  }),
});

// books-api.handlers.ts
export const [BooksApiActions, booksApiReducer] = combineHandlers(initBooksState, 'booksApi', {
  fetchBooksSuccess: (state, { books }: { books: Book[] }) => ({
    ...state,
    books,
    loading: false,
  }),
  fetchBooksError: state => ({ ...state, books: [], loading: false }),
});

// books.reducer.ts
export const booksReducer = mergeReducers(booksPageReducer, booksApiReducer);
```

`combineHandlers` function returns strongly typed action creators and a reducer with O(1) efficiency.

Another great thing about `combineHandlers` is that you don't have to manually write action types.
For example, when the source is `booksPage` and the event is `search`, it will generate the action creator
with type `[booksPage] search`.

Every reducer generated by `combineHandlers` function can be used independently via `StoreModule`.
However, if you have multiple sources for a single state slice, there is `mergeReducers` function that
will merge provided reducers into one.

In case you need to define actions without changing the state, this plugin provides `plain` and
`withPayload` functions.

```typescript
export const [BooksPageActions, booksPageReducer] = combineHandlers(initBooksState, 'booksPage', {
  showCreateBookDialog: plain(),
  createBook: withPayload<{ book: Book }>(),
});
```

See the sample project [here](https://github.com/markostanimirovic/ngrx-handlers/tree/master/projects/playground).

## ✊ Show Your Support

Give a ⭐ if you like NgRx Handlers 🙂

## 🤝 Contribute

Contributions are always welcome!

## 💡 Inspiration

This project is inspired by [Juliette](https://github.com/markostanimirovic/juliette).

## 📝 License

This project is [MIT licensed](./LICENSE).

Copyright © 2020-2021 [Marko Stanimirović](https://github.com/markostanimirovic)
