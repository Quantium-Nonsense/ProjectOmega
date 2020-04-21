import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CustomerModel} from '../models/customers/customer.model';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as fromCustomers from './store/customers.reducer';
import * as CustomerActions from './store/customers.actions';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

	displayColumns: string[] = ['name', 'category', 'email', 'country', 'actions'];
	customers: MatTableDataSource<CustomerModel>;

	private subscription: Subscription;

	constructor(
		private store: Store<fromApp.State>
	) {
		this.subscription = new Subscription();
		this.customers = new MatTableDataSource<CustomerModel>([]);
	}

	ngOnInit(): void {
		this.store.dispatch(CustomerActions.beginLoadingCustomers());
		this.subscription.add(
			this.store.select(fromCustomers.selectAllCustomers).subscribe(customers => {
				this.customers.data = customers;
				this.customers.paginator = this.paginator
			})
		);
	}
}
