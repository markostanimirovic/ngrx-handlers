import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksComponent } from './books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { booksFeatureName } from './books.state';
import { BooksEffects } from './books.effects';
import { booksReducer } from './books.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    StoreModule.forFeature(booksFeatureName, booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  declarations: [BooksComponent],
})
export class BooksModule {}
