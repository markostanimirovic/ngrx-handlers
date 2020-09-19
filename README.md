# 🕹️ NgRx Handlers

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM](https://img.shields.io/npm/v/ngrx-handlers)](https://www.npmjs.com/package/ngrx-handlers)
[![Build Status](https://travis-ci.org/markostanimirovic/ngrx-handlers.svg?branch=master)](https://travis-ci.org/markostanimirovic/ngrx-handlers)

**NgRx Plugin for Boilerplate Elimination**

## ☝️ Why to use NgRx Handlers?

- Because it's boring to write action types manually
- Because it's annoying to define an action and then its reducer every single time
- Because you don't need to write too much code for simple functionality

## 🚀 Getting Started

### 🔧 Installation

Install NgRx Handlers via `npm install ngrx-handlers` command.

### ⚡ Usage

**NgRx Boilerplate**

```typescript
// books.actions.ts

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

// books.reducer.ts

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
```

**NgRx Handlers Instead of Boilerplate**

```typescript
// books.handlers.ts

import { Book } from '../models/book';
import { combineHandlers } from 'ngrx-handlers';

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
});
```

![Magic](https://media2.giphy.com/media/12NUbkX6p4xOO4/giphy.gif?cid=ecf05e47o0k6y4gdqo9ywj9y5q0wtqzsa8jnr900xih3myds&rid=giphy.gif)

## ✊ Show Your Support

Give a ⭐ if you like NgRx Handlers 🙂

## 🤝 Contribute

Contributions are always welcome!

## 💡 Inspiration

This project is inspired by [Juliette](https://github.com/markostanimirovic/juliette).

## 📝 License

This project is [MIT licensed](./LICENSE).

Copyright © 2020 Marko Stanimirović
