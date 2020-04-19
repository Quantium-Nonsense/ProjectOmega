// Modules imported
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // <-- NgModel lives here
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
// Components imported
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { AuthEffects } from './auth/store/auth.effects';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appReducer, metaReducers } from './reducers';
import { PopupDialogComponent } from './shared/components/popup-dialog/popup-dialog.component';
import { SharedModule } from './shared/shared.module';
import { UserEffects } from './user/store/user.effects';

export const getToken = () => localStorage.getItem(environment.ACCESS_TOKEN);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomersComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects
    ]),
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
    }),
    MatCardModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
})
export class AppModule {
}
