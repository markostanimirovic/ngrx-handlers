import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksActions, BooksAppState, fromBooks } from './index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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

  showCreateBookDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.showCreateBookDialog),
        tap(({ type }) => alert(type)),
      ),
    { dispatch: false },
  );

  createBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.createBook),
        tap(({ type, book }) => {
          console.log('🚀', type);
          console.log('📖', book);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private store: Store<BooksAppState>,
    private actions$: Actions,
    private booksService: BooksService,
  ) {}
}
