import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { CounterRoutingModule } from './counter-routing.module';
import { StoreModule } from '@ngrx/store';
import { counterPageReducer } from './counter.handlers';

@NgModule({
  declarations: [CounterComponent],
  imports: [
    CommonModule,
    CounterRoutingModule,
    StoreModule.forFeature('counter', counterPageReducer),
  ],
})
export class CounterModule {}
