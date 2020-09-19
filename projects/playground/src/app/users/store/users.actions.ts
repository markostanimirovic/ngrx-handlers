import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const fetchUsers = createAction('[Users] Fetch Users');
export const fetchUsersSuccess = createAction(
  '[Users] Fetch Users Success',
  props<{ users: User[] }>(),
);
export const fetchUsersError = createAction('[Users] Fetch Users Error');

export const updateSearchTerm = createAction(
  '[Users] Update Search Term',
  props<{ searchTerm: string }>(),
);
export const updateSelectedPageSize = createAction(
  '[Users] Update Selected Page Size',
  props<{ selectedPageSize: number }>(),
);
