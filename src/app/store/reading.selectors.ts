
import { createFeatureSelector, createSelector } from '@ngrx/store'

import { ReadingState } from './reading.reducer'

// Selecciona el estado completo de lectura
export const selectReadingState =
  createFeatureSelector<ReadingState>('reading')

// Selecciona únicamente los recursos
export const selectReadingResources = createSelector(
  selectReadingState,
  (state) => state.resources
)
