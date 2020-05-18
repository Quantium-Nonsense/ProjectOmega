import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthEffects } from './auth/store/auth.effects';
import { CompanyEffects } from './company/store/company.effects';
import { HomeEffects } from './home/store/home.effects';
import { OrderEffects } from './order/store/order.effects';
import { appReducer, metaReducers } from './reducers';
import { SharedModule } from './shared/shared.module';

export const getToken = () => {
  const token = localStorage.getItem(environment.ACCESS_TOKEN);
  if (token) {
    return localStorage.getItem(environment.ACCESS_TOKEN).replace(new RegExp('"', 'g'), '');
  }
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [
            '40.65.236.154'
        ]
      }
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(appReducer, {
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true
      }
    }),
    SharedModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      AuthEffects,
      HomeEffects,
      CompanyEffects,
      OrderEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ]
})
export class AppModule {}
