import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BooksService } from './books.service';
import { of } from 'rxjs';
import { BooksAppState } from './books.state';
import { booksPageActions } from './handlers/books-page.handlers';
import { booksEffectsActions } from './handlers/books-effects.handlers';
import { selectBooks } from './books.selectors';

@Injectable()
export class BooksEffects {
  invokeFetchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksPageActions.updateSearchTerm),
      map(() => booksEffectsActions.fetchBooks()),
    ),
  );

  fetchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksEffectsActions.fetchBooks),
      withLatestFrom(this.store.select(selectBooks)),
      switchMap(([, { searchTerm }]) =>
        this.booksService.getBooks(searchTerm).pipe(
          map(books => booksEffectsActions.fetchBooksSuccess({ books })),
          catchError(() => of(booksEffectsActions.fetchBooksError())),
        ),
      ),
    ),
  );

  showCreateBookDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksPageActions.showCreateBookDialog),
        tap(({ type }) => alert(type)),
      ),
    { dispatch: false },
  );

  createBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(booksPageActions.createBook),
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
