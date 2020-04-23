import {Component, OnInit} from '@angular/core';
import * as fromApp from '../reducers/index';
import {Store} from '@ngrx/store';
import * as ClientActions from './store/suppliers.actions';

@Component({
	selector: 'app-clients',
	templateUrl: './suppliers.component.html',
	styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

	constructor(
		private store$: Store<fromApp.State>
	) {
	}

	ngOnInit(): void {
		// Load all supplier
		this.store$.dispatch(ClientActions.beginLoadingSuppliers());
	}

}
