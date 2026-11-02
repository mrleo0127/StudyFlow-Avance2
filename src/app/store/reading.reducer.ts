
import { createReducer, on } from '@ngrx/store'

import { Resource } from '../services/resources.service'

import {
  addToReading,
  removeFromReading,
} from './reading.actions'

export interface ReadingState {
  resources: Resource[]
}

export const initialReadingState: ReadingState = {
  resources: [],
}

export const readingReducer = createReducer(
  initialReadingState,

  on(addToReading, (state, { resource }) => {

    const alreadyExists = state.resources.some(
      (item) => item.id === resource.id
    )

    if (alreadyExists) {
      return state
    }

    return {
      ...state,
      resources: [...state.resources, resource],
    }
  }),

  on(removeFromReading, (state, { resourceId }) => ({
    ...state,
    resources: state.resources.filter(
      (resource) => resource.id !== resourceId
    ),
  }))
)
