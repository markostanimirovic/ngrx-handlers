import { Component } from '@angular/core';
import { actions as BooksActions } from './books/state/books.handlers';

@Component({
  selector: 'pg-root',
  template: '{{ title }}',
})
export class AppComponent {
  title = 'playground';

  constructor() {
    BooksActions.fetchBooks();
    BooksActions.updateSearchTerm({ searchTerm: '' });
  }
}
