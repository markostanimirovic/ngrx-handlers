import { Component } from '@angular/core';
import { combineHandlers, plain, withPayload } from 'ngrx-handlers';

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
    const { actions } = combineHandlers(initialState, 'users', {
      // fetchUsers: (state, payload: any[]) => ({ ...state }),
      f: plain(),
      f1: state => ({ ...state, loading: false }),
      g: withPayload<User>(),
      // fetchUsersSuccess: (state, payload) => state,
      // fetchUsersError: (state, payload: { a: string }) => state,
    });

    actions.f();
    actions.f1();
    actions.g({} as User);
    // actions.fetchUsers();
    // actions.fetchUsersSuccess();
    // actions.fetchUsersSuccess()
    // actions.fetchUsersError()

    // console.log(getActionName('[U] Is Ok'));
    // console.log(getActionType('u', 'isOk'));
  }
}
