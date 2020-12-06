import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterPageActions } from './counter.handlers';
import { selectCounter } from './counter.selectors';

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
  counter$ = this.store.select(selectCounter);

  constructor(private store: Store) {}

  onIncrement(): void {
    this.store.dispatch(counterPageActions.increment());
  }

  onDecrement(): void {
    this.store.dispatch(counterPageActions.decrement());
  }

  onReset(): void {
    this.store.dispatch(counterPageActions.reset());
  }
}
