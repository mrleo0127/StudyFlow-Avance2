
import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'
import { Resource } from './resources.service'

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private readonly storageKey = 'studyflow_favorites'

  getFavorites(): Resource[] {
    const savedFavorites = ApplicationSettings.getString(
      this.storageKey,
      '[]'
    )

    try {
      return JSON.parse(savedFavorites) as Resource[]
    } catch (error) {
      console.error('Error al recuperar favoritos:', error)
      return []
    }
  }

  isFavorite(resourceId: number): boolean {
    return this.getFavorites().some(
      (resource) => resource.id === resourceId
    )
  }

  toggleFavorite(resource: Resource): boolean {
    const favorites = this.getFavorites()

    const index = favorites.findIndex(
      (item) => item.id === resource.id
    )

    if (index !== -1) {
      favorites.splice(index, 1)
    } else {
      favorites.push(resource)
    }

    ApplicationSettings.setString(
      this.storageKey,
      JSON.stringify(favorites)
    )

    return index === -1
  }
}
