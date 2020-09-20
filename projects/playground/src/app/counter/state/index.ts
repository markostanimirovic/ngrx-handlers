import * as fromCounter from './counter.handlers';

const CounterActions = fromCounter.actions;
export { fromCounter, CounterActions };

export interface CounterAppState {
  [fromCounter.featureName]: number;
}
