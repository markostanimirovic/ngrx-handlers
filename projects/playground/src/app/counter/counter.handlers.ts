import { combineHandlers } from 'ngrx-handlers';

export const [counterPageActions, counterPageReducer] = combineHandlers(0, 'counterPage', {
  increment: state => state + 1,
  decrement: state => state - 1,
  reset: () => 0,
});
