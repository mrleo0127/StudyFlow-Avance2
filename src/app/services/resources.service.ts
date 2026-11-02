import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { API_CONFIG } from '../core/config/api.config'

export interface Resource {
  id: number
  title: string
  category: string
  description: string
}

export interface ResourcesResponse {
  total: number
  resources: Resource[]
}

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  private readonly endpoint = `${API_CONFIG.baseUrl}/api/resources`

  private readonly headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true',
  })

  constructor(private http: HttpClient) {}

  getResources(): Observable<ResourcesResponse> {
    return this.http.get<ResourcesResponse>(this.endpoint, {
      headers: this.headers,
    })
  }

  searchResources(query: string): Observable<ResourcesResponse> {
  const params = new HttpParams().set('search', query.trim())

  console.log('Búsqueda enviada:', query)
  console.log('Parámetros:', params.toString())

  return this.http.get<ResourcesResponse>(this.endpoint, {
    params,
    headers: this.headers,
  })
}
}