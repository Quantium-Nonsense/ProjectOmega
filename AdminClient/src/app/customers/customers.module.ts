import {NgModule} from '@angular/core';

import {CustomersRoutingModule} from './customers-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CustomersComponent} from './customers.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
	declarations: [
		CustomersComponent,
		CustomerFormComponent,
	],
	imports: [
		SharedModule,
		CustomersRoutingModule,
		ReactiveFormsModule,
	]
})
export class CustomersModule {
}
