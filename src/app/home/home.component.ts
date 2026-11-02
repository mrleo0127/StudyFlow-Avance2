
import { Component } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Store } from '@ngrx/store'

import { selectReadingResources } from '../store/reading.selectors'
import { removeFromReading } from '../store/reading.actions'
import { Resource } from '../services/resources.service'

@Component({
  standalone: false,
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  readingResources$ = this.store.select(selectReadingResources)

  constructor(private store: Store) {}

  removeFromList(resource: Resource): void {
    this.store.dispatch(
      removeFromReading({ resourceId: resource.id })
    )
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}

