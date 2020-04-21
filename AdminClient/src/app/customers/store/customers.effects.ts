import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CustomerActions from './customers.actions';
import {delay, map, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {CustomerModel} from '../../models/customers/customer.model';

@Injectable()
export class CustomersEffects {

	loadAllCustomers$ = createEffect(() => this.actions$.pipe(
		ofType(CustomerActions.beginLoadingCustomers),
		switchMap((action: Action) => of(this.createDummyCustomers()).pipe(delay(2000)))
	));

	constructor(
		private actions$: Actions
	) {
	}

	/**
	 * Create 50 dummy customers
	 *
	 * @returns CustomerModel[]
	 */
	createDummyCustomers = (): Action & { customers: CustomerModel[] } => {
		const dummyCustomers: CustomerModel[] = [];
		for (let i = 0; i < 50; i++) {
			dummyCustomers.push({
				contactNumber: i.toString(),
				description: `Amazing client ${i}`,
				email: `bla${i}@bla.com`,
				firstName: `FirstName${i}`,
				lastName: `FirstName${i}`,
				id: i,
				companyName: `Company ${i}`,
				notes: 'bla and mac bla'
			});
		}

		return CustomerActions.customersLoaded({customers: dummyCustomers});
	};
}
