import {NgModule} from '@angular/core';

import {SupplierRoutingModule} from './supplier-routing.module';
import {SharedModule} from '../shared/shared.module';
import { SupplierComponent } from './supplier.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import {ReactiveFormsModule} from '@angular/forms';


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
