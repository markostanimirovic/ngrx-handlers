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

**Without NgRx Handlers**

```typescript
// users.actions.ts

import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const fetchUsers = createAction('[Users] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[Users] Fetch Users Success',
  props<{ users: User[] }>(),
);
export const fetchUsersError = createAction('[Users] Fetch Users Error');

// users.reducer.ts

import { User } from '../models/user';
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';

export const featureName = 'users';

export interface State {
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  users: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.fetchUsers, state => ({ ...state, loading: true })),
  on(UsersActions.fetchUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UsersActions.fetchUsersError, state => ({ ...state, users: [], loading: false })),
);
```

**With NgRx Handlers**

```typescript
// users.handlers.ts

import { User } from '../models/user';
import { combineHandlers } from 'ngrx-handlers';

export const featureName = 'users';

export interface State {
  users: User[];
  loading: boolean;
}

export const initialState: State = {
  users: [],
  loading: false,
};

export const { actions, reducer } = combineHandlers(initialState, featureName, {
  fetchUsers: state => ({ ...state, loading: true }),
  fetchUsersSuccess: (state, { users }: { users: User[] }) => ({ ...state, users, loading: false }),
  fetchUsersError: state => ({ ...state, users: [], loading: false }),
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
