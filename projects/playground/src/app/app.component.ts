import { Component } from '@angular/core';

@Component({
  selector: 'pg-root',
  template: `
    <div class="header">
      <a routerLink="/books">Books</a>
      <a routerLink="/counter">Counter</a>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
