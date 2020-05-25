import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { IonicModule } from '@ionic/angular';

import { AddCustomerPageRoutingModule } from './add-customer-routing.module';

import { AddCustomerPage } from './add-customer.page';

@NgModule({
  declarations: [AddCustomerPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCustomerPageRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class AddCustomerPageModule {
}
