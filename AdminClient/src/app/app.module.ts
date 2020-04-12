// Modules imported
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // <-- NgModel lives here
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// Components imported
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from './auth/store/auth.effects';
import { appReducer, metaReducers } from './reducers';

export const getToken = () => localStorage.getItem(environment.ACCESS_TOKEN);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    StoreModule.forRoot(appReducer, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    })
  ],
  providers: [],
})
export class AppModule { }
