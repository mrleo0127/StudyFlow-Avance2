
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Application } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Store } from '@ngrx/store'

import { FavoritesService } from '../services/favorites.service'
import { Resource } from '../services/resources.service'
import { addToReading } from '../store/reading.actions'

@Component({
  standalone: false,
  selector: 'Favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {

  favorites: Resource[] = []

  constructor(
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loadFavorites()
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites()
    this.cdr.detectChanges()
  }

  removeFavorite(resource: Resource): void {
    this.favoritesService.toggleFavorite(resource)
    this.loadFavorites()
  }

  readNow(resource: Resource): void {
    this.store.dispatch(addToReading({ resource }))

    console.log('Recurso enviado a la lista de lectura:', resource.title)
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}

