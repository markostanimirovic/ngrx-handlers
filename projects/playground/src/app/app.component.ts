import { Component } from '@angular/core';
import { createActionsAndReducer, plain, withPayload } from './lib';

interface User {
  name: string;
}

interface State {
  users: User[];
  loading: boolean;
}

const initialState: State = { users: [], loading: false };

@Component({
  selector: 'pg-root',
  template: ` {{ title }} `,
})
export class AppComponent {
  title = 'playground';

  constructor() {
    const { actions, reducer } = createActionsAndReducer(initialState, 'users', {
      fetchUsers: (state, payload: any[]) => state,
      f: plain(),
      f1: state => state,
      g: withPayload<User>(),
      fetchUsersSuccess: (state, payload: User) => state,
      fetchUsersError: (state, payload: { a: string }) => state,
    });

    // actions.f();
    // actions.g({});
    // actions.fetchUsers()
    // actions.fetchUsersSuccess()
    // actions.fetchUsersError()
  }
}
