
import { Component, OnInit } from '@angular/core'
import {
  Application,
  ApplicationSettings,
} from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

@Component({
  standalone: false,
  selector: 'Settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  userName = ''
  currentUserName = ''
  message = ''

  ngOnInit(): void {
    this.currentUserName = ApplicationSettings.getString(
      'studyflow_username',
      ''
    )

    this.userName = this.currentUserName
  }

  saveUserName(): void {
    const name = this.userName.trim()

    if (!name) {
      this.message = 'Por favor, ingresa un nombre.'
      return
    }

    ApplicationSettings.setString('studyflow_username', name)

    this.currentUserName = name
    this.userName = name
    this.message = 'Nombre guardado correctamente.'
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}

