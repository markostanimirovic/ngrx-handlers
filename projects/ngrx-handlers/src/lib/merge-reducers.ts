import { ActionReducer } from '@ngrx/store';

/**
 * Merges the array of reducers into one.
 *
 * @param reducers Group of reducers for the same state slice.
 * @param initialState Initial state for the group of reducers.
 * @returns A reducer that merges passed array of reducer into one.
 */
export function mergeReducers<State>(...reducers: ActionReducer<State>[]): ActionReducer<State> {
  return (state, action) => {
    const reducer = reducers.find(r => r(state, action) !== state);
    return reducer ? reducer(state, action) : state!;
  };
}
