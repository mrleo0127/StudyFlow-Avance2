
import { createAction, props } from '@ngrx/store'
import { Resource } from '../services/resources.service'

export const addToReading = createAction(
  '[Reading] Add Resource',
  props<{ resource: Resource }>()
)

export const removeFromReading = createAction(
  '[Reading] Remove Resource',
  props<{ resourceId: number }>()
)
