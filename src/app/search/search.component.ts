import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import {
  ResourcesService,
  Resource,
} from '../services/resources.service'
import { FavoritesService } from '../services/favorites.service'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchText = ''
  resources: Resource[] = []
  loading = false
  errorMessage = ''
  favoriteIds: number[] = []

  constructor(
  private resourcesService: ResourcesService,
  private cdr: ChangeDetectorRef,
  private favoritesService: FavoritesService
) {}

  ngOnInit(): void {
  this.loadFavorites()
  this.loadResources()
}

loadFavorites(): void {
  this.favoriteIds = this.favoritesService
    .getFavorites()
    .map((resource) => resource.id)
}

toggleFavorite(resource: Resource): void {
  const added = this.favoritesService.toggleFavorite(resource)

  this.loadFavorites()

  console.log(
    added
      ? 'Recurso agregado a favoritos'
      : 'Recurso eliminado de favoritos'
  )

  this.cdr.detectChanges()
}

  loadResources(): void {
  this.loading = true
  this.errorMessage = ''

  console.log('1. Iniciando solicitud de recursos...')

  this.resourcesService.getResources().subscribe({
    next: (response) => {
  console.log('Respuesta recibida:', response)

  this.resources = response.resources
  this.loading = false

  this.cdr.detectChanges()
},
    error: (error) => {
  console.error('Error al cargar los recursos:', error)

  this.errorMessage = 'No fue posible cargar los recursos.'
  this.loading = false

  this.cdr.detectChanges()
},
    complete: () => {
      console.log('5. Solicitud completada.')
    },
  })
}

  onSearch(): void {
  const query = this.searchText.trim()

  if (!query) {
    this.loadResources()
    return
  }

  console.log('Texto ingresado:', this.searchText)
  console.log('Texto procesado:', query)

  this.loading = true
  this.errorMessage = ''

  this.resourcesService.searchResources(query).subscribe({
    next: (response) => {
      console.log('Resultados de búsqueda:', response)

      this.resources = response.resources
      this.loading = false

      this.cdr.detectChanges()
    },
    error: (error) => {
      console.error('Error al buscar recursos:', error)

      this.errorMessage = 'No fue posible realizar la búsqueda.'
      this.loading = false

      this.cdr.detectChanges()
    },
  })
}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
