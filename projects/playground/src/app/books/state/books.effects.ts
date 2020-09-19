import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksActions, BooksAppState, fromBooks } from './index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { BooksService } from '../core/services/books.service';
import { of } from 'rxjs';

@Injectable()
export class BooksEffects {
  invokeFetchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.updateSearchTerm),
      map(() => BooksActions.fetchBooks()),
    ),
  );

  fetchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.fetchBooks),
      withLatestFrom(this.store.select(fromBooks.featureName)),
      switchMap(([, { searchTerm }]) =>
        this.booksService.getBooks(searchTerm).pipe(
          map(books => BooksActions.fetchBooksSuccess({ books })),
          catchError(() => of(BooksActions.fetchBooksError())),
        ),
      ),
    ),
  );

  constructor(
    private store: Store<BooksAppState>,
    private actions$: Actions,
    private booksService: BooksService,
  ) {}
}
