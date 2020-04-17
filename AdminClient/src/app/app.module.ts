// Modules imported
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // <-- NgModel lives here
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components imported
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { DialogBodyComponent } from './customers/dialog-body/dialog-body.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    DialogBodyComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [HttpClientModule],
  entryComponents: [DialogBodyComponent]
})
export class AppModule { }
