import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BooksAppState } from './books.state';
import { booksPageActions } from './handlers/books-page.handlers';
import { selectBooks } from './books.selectors';

@Component({
  selector: 'pg-books',
  template: `
    <ng-container *ngIf="viewModel$ | async as vm">
      <input type="text" [formControl]="searchTermControl" />
      <ul *ngIf="!vm.loading; else loading">
        <li *ngFor="let book of vm.books">{{ book.title }}</li>
      </ul>
      <ng-template #loading>
        <p>Loading...</p>
      </ng-template>

      <div class="buffer-top">
        <button class="buffer-right" (click)="onShowCreateBookDialog()">
          Show Create Book Dialog
        </button>
        <button (click)="onCreateBook()">Create Book</button>
      </div>
    </ng-container>
  `,
})
export class BooksComponent implements OnInit, OnDestroy {
  private destroy = new Subject();

  searchTermControl = new FormControl('');
  viewModel$ = this.store.select(selectBooks);

  constructor(private store: Store<BooksAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(booksPageActions.updateSearchTerm({ searchTerm: '' }));

    this.searchTermControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe(searchTerm =>
        this.store.dispatch(booksPageActions.updateSearchTerm({ searchTerm })),
      );
  }

  onShowCreateBookDialog(): void {
    this.store.dispatch(booksPageActions.showCreateBookDialog());
  }

  onCreateBook(): void {
    this.store.dispatch(booksPageActions.createBook({ book: { id: 6, title: 'Book 6' } }));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
