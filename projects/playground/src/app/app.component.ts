import { Component } from '@angular/core';
import { sum } from 'ngrx-handlers';

@Component({
  selector: 'pg-root',
  template: ` {{ title }} `,
})
export class AppComponent {
  title = sum(1, 2);
}
