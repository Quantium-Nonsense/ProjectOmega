import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CustomerActions from './customers.actions';
import {delay, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {of, pipe} from 'rxjs';
import {CustomerModel} from '../../models/customers/customer.model';
import {MatDialog} from '@angular/material/dialog';
import {PopupDialogDataModel} from '../../shared/model/popup-dialog-data.model';
import * as fromApp from '../../reducers/index';
import {PopupDialogComponent} from '../../shared/components/popup-dialog/popup-dialog.component';
import {environment} from '../../../environments/environment';
import * as fromCustomers from './customers.reducer';
import {selectAllCustomers} from './customers.reducer';

@Injectable()
export class CustomersEffects {

	editCustomer$ = createEffect(() => this.actions$.pipe(
		ofType(CustomerActions.editCustomer),
		switchMap((action: Action) => of(this.editCustomer()).pipe(
			delay(2000),
			tap(() => this.dialog.closeAll())
		))
	));

	deleteCustomer$ = createEffect(() => this.actions$.pipe(
		ofType(CustomerActions.deleteCustomer),
		switchMap((action: Action) => of(this.deleteCustomer()).pipe(
			delay(2000),
			tap(() => this.dialog.closeAll())
		))
	));

	loadAllCustomers$ = createEffect(() => this.actions$.pipe(
		ofType(CustomerActions.beginLoadingCustomers),
		switchMap((action: Action) => of(this.createDummyCustomers()).pipe(delay(2000)))
	));

	showDeleteUserDialog$ = createEffect(() => this.actions$.pipe(
		ofType(CustomerActions.showDeleteCustomerDialog),
		map((action: Action & { customer: CustomerModel }) => this.showDeleteDialog(action.customer))
	), {dispatch: false});

	constructor(
		private store: Store<fromApp.State>,
		private actions$: Actions,
		public dialog: MatDialog
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

	private showDeleteDialog(customer: CustomerModel) {
		this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(PopupDialogComponent, {
			data: {
				isDisabled: this.store.select(fromCustomers.selectIsLoading),
				title: environment.common.DELETE_CUSTOMER_TITLE,
				description: environment.common.DELETE_CUSTOMER_CONFIRM_TEXT,
				dialogActions: [
					{
						color: 'warn',
						text: environment.common.CONFIRMATION_TEXT,
						action: () => this.store.dispatch(CustomerActions.deleteCustomer())
					},
					{
						color: 'primary',
						text: environment.common.CANCELLATION_TEXT,
						action: () => this.dialog.closeAll()
					}

				]
			}
		});
	}

	private deleteCustomer(): Action {
		let currentCustomer: CustomerModel = null;
		let allCustomers: CustomerModel[] = [];

		this.store.select(fromCustomers.selectAllCustomers).pipe(take(1)).subscribe(customers => allCustomers = customers);
		this.store.select(fromCustomers.selectSelectedCustomer).pipe(take(1)).subscribe(customer => currentCustomer = customer);

		const newCustomers = allCustomers.filter(customer => customer.id !== currentCustomer.id);

		return CustomerActions.customerDeletedSuccess({newCustomers});
	}

	private editCustomer(): Action {

	}
}
