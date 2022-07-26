import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {ApiService} from "./services/api.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {UserService} from "./services/user.service";
import {SnackbarService} from "./services/snackbar.service";
import {DateService} from "./services/date.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AppRoutingModule,
    MatMomentDateModule
  ],
  providers: [ApiService, AuthGuardService, UserService, SnackbarService,MatSnackBar, DateService, {
    provide: MAT_DATE_LOCALE,
    useValue: 'de-DE'
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: ['l', 'LL'],
      },
      display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    },
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
