import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';


@NgModule({
  declarations: [SupplierComponent, SupplierFormComponent],
  imports: [
    SharedModule,
    SupplierRoutingModule,
    ReactiveFormsModule
  ]
})
export class SupplierModule {
}
