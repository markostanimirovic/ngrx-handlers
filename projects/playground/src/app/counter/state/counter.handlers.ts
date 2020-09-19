import { combineHandlers } from 'ngrx-handlers';

export const featureName = 'counter';

export const initialState = 0;

export const { actions, reducer } = combineHandlers(initialState, featureName, {
  increment: state => state + 1,
  decrement: state => state - 1,
  reset: () => 0,
});
