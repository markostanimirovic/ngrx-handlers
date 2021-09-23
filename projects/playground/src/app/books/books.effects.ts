import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { BooksService } from './books.service';
import { of } from 'rxjs';
import { BooksAppState } from './books.state';
import { booksPageActions } from './handlers/books-page.handlers';
import { booksApiActions } from './handlers/books-api.handlers';
import { selectBooksState } from './books.selectors';

@Injectable()
export class BooksEffects {
  readonly fetchBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(booksPageActions.enter, booksPageActions.search),
      concatLatestFrom(() => this.store.select(selectBooksState)),
      switchMap(([, { searchTerm }]) =>
        this.booksService.getBooks(searchTerm).pipe(
          map(books => booksApiActions.fetchBooksSuccess({ books })),
          catchError(() => of(booksApiActions.fetchBooksError())),
        ),
      ),
    );
  });

  readonly showCreateBookDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(booksPageActions.showCreateBookDialog),
        tap(({ type }) => alert(type)),
      );
    },
    { dispatch: false },
  );

  createBook$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(booksPageActions.createBook),
        tap(({ type, book }) => {
          console.log('🚀', type);
          console.log('📖', book);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly store: Store<BooksAppState>,
    private readonly actions$: Actions,
    private readonly booksService: BooksService,
  ) {}
}
