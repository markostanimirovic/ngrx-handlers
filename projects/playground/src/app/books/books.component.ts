import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksActions, BooksAppState, fromBooks } from './state';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BooksService } from './core/services/books.service';

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
    </ng-container>
  `,
})
export class BooksComponent implements OnInit, OnDestroy {
  private destroy = new Subject();
  searchTermControl = new FormControl('');

  viewModel$ = this.store.select(fromBooks.featureName);

  constructor(private store: Store<BooksAppState>, private booksService: BooksService) {}

  ngOnInit(): void {
    this.store.dispatch(BooksActions.updateSearchTerm({ searchTerm: '' }));

    this.searchTermControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy))
      .subscribe(searchTerm => this.store.dispatch(BooksActions.updateSearchTerm({ searchTerm })));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
