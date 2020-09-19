import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { fromBooks } from './state';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './state/books.effects';
import { BooksComponent } from './books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BooksRoutingModule,
    StoreModule.forFeature(fromBooks.featureName, fromBooks.reducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  declarations: [BooksComponent],
})
export class BooksModule {}
