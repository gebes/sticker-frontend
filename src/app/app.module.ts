import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {ApiService} from "./services/api.service";
import {UserService} from "./services/user.service";
import {SnackbarService} from "./services/snackbar.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {environment} from "../environments/environment";
import {CookieModule, CookieService} from "ngx-cookie";
import {LoginComponent} from './login/login.component';
import {CreateComponent} from './home/create.component';
import {NavComponent} from "./home/nav.component";
import {AgmOverlays} from "agm-overlays";
import {InfoComponent} from './home/info.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    NavComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey
    }),
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatMomentDateModule,
    CookieModule.withOptions(),
    AgmOverlays
  ],
  providers: [ApiService, UserService, MatSnackBar, SnackbarService, CookieService, {
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
export class AppModule {
}
