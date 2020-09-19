import { User } from '../models/user';
import { combineHandlers } from 'ngrx-handlers';

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

export const { actions, reducer } = combineHandlers(initialState, featureName, {
  fetchUsers: state => ({ ...state, loading: true }),
  fetchUsersSuccess: (state, { users }: { users: User[] }) => ({ ...state, users, loading: false }),
  fetchUsersError: state => ({ ...state, users: [], loading: false }),
  updateSearchTerm: (state, { searchTerm }: { searchTerm: string }) => ({ ...state, searchTerm }),
  updateSelectedPageSize: (state, { selectedPageSize }: { selectedPageSize: number }) => ({
    ...state,
    selectedPageSize,
  }),
});
