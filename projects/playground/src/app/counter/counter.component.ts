import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions, CounterAppState, fromCounter } from './state';

@Component({
  selector: 'pg-counter',
  template: `
    <button class="buffer-right" (click)="onIncrement()">Increment</button>
    <button class="buffer-right" (click)="onDecrement()">Decrement</button>
    <button (click)="onReset()">Reset</button>
    <p>Value: {{ counter$ | async }}</p>
  `,
})
export class CounterComponent {
  counter$ = this.store.select(fromCounter.featureName);

  constructor(private store: Store<CounterAppState>) {}

  onIncrement(): void {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  onReset(): void {
    this.store.dispatch(CounterActions.reset());
  }
}
