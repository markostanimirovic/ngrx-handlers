import { Component } from '@angular/core';
import { actions as UsersActions } from './users/store/users.handlers';

@Component({
  selector: 'pg-root',
  template: ` {{ title }} `,
})
export class AppComponent {
  title = 'playground';

  constructor() {
    UsersActions.fetchUsers();
    UsersActions.updateSearchTerm({ searchTerm: '' });
  }
}
