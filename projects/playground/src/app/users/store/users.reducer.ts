import { User } from '../models/user';
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';

export const featureName = 'users';

export interface State {
  users: User[];
  loading: boolean;
  searchTerm: string;
  selectedPageSize: number;
  pageSizes: number[];
}

export const initialState: State = {
  users: [],
  loading: false,
  searchTerm: '',
  selectedPageSize: 3,
  pageSizes: [3, 5, 7],
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.fetchUsers, state => ({ ...state, loading: true })),
  on(UsersActions.fetchUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UsersActions.fetchUsersError, state => ({ ...state, users: [], loading: false })),
  on(UsersActions.updateSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
  on(UsersActions.updateSelectedPageSize, (state, { selectedPageSize }) => ({
    ...state,
    selectedPageSize,
  })),
);
