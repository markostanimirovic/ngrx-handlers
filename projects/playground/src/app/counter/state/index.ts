import * as fromCounter from './counter.handlers';

export interface CounterAppState {
  [fromCounter.featureName]: number;
}

const CounterActions = fromCounter.actions;
export { fromCounter, CounterActions };
