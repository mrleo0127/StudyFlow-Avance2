
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'

import {
  NativeScriptModule,
  NativeScriptHttpClientModule,
} from '@nativescript/angular'

import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SplashComponent } from './splash/splash.component'

import { readingReducer } from './store/reading.reducer'

@NgModule({
  bootstrap: [AppComponent],

  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptUISideDrawerModule,

    StoreModule.forRoot({
      reading: readingReducer,
    }),
  ],

  declarations: [
    AppComponent,
    SplashComponent,
  ],

  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

