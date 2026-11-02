import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { SplashComponent } from './splash/splash.component'

const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },

  { path: 'splash', component: SplashComponent },

  { path: 'home', loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule) },
  { path: 'browse', loadChildren: () => import('~/app/browse/browse.module').then((m) => m.BrowseModule) },
  { path: 'search', loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule) },
  { path: 'tasks', loadChildren: () => import('~/app/tasks/tasks.module').then((m) => m.TasksModule) },
  { path: 'settings', loadChildren: () => import('~/app/settings/settings.module').then((m) => m.SettingsModule) },
  {
  path: 'favorites',
  loadChildren: () =>
    import('./favorites/favorites.module').then(
      (m) => m.FavoritesModule
    ),
},
]
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
