import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as SupplierActions from './suppliers.actions';
import {delay, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SupplierModel} from '../../shared/model/supplier/supplier.model';

@Injectable()
export class SuppliersEffects {

	loadAllClients$ = createEffect(() => this.actions$.pipe(
		ofType(SupplierActions.beginLoadingSuppliers),
		switchMap((action: Action) => of(this.loadAllClients()).pipe(delay(2000)))
		)
	);

	constructor(
		private actions$: Actions,
		private store$: Store<fromApp.State>
	) {
	}

	createDummyClients() {
		const dummySuppliers: SupplierModel[] = [];

		for (let i = 0; i < 50; i++) {
			dummySuppliers.push({
				companyName: `Company ${i}`,
				contactNumber: `${i.toString().repeat(9)}`,
				description: `Some amazing company ${i}`,
				email: `bla${i}@bla.com`,
				firstName: `first name ${i}`,
				lastName: `last name ${i}`,
				id: `${i}`,
				notes: `look at me i am note ${i} FEAR ME!`
			});
		}

		return dummySuppliers;
	}

	loadAllClients(): Action {
		const allSuppliers = this.createDummyClients();

		return SupplierActions.
	};
}
