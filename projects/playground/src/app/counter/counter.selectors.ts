import { createFeatureSelector } from '@ngrx/store';

export const selectCounter = createFeatureSelector<number>('counter');
