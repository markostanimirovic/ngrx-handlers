import { ActionReducer } from '@ngrx/store';

/**
 * Merges the array of reducers into one.
 *
 * @param reducers An array of reducers for the same state slice.
 * @returns A reducer merged from the provided reducers.
 *
 * @example
 * // movies.reducer.ts
 * const moviesReducer = mergeReducers(moviesPageReducer, moviesEffectsReducer);
 *
 * // movies.module.ts
 * \@NgModule({
 *   imports: [StoreModule.forFeature('movies', moviesReducer)],
 * })
 * export class MoviesModule {}
 *
 * @see combineHandlers
 */
export function mergeReducers<State>(...reducers: ActionReducer<State>[]): ActionReducer<State> {
  return (state, action) => {
    const reducer = reducers.find(r => r(state, action) !== state);
    return reducer ? reducer(state, action) : state!;
  };
}
