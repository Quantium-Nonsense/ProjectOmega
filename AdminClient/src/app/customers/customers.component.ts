import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CustomerModel} from '../models/customers/customer.model';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as fromCustomers from './store/customers.reducer';
import * as CustomerActions from './store/customers.actions';
import {Observable, Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	displayColumns: string[] = ['companyName', 'email', 'contactNumber', 'actions'];
	customers: MatTableDataSource<CustomerModel>;
	isLoading: Observable<boolean>;

	private subscription: Subscription;

	constructor(
		private store: Store<fromApp.State>
	) {
		this.isLoading = new Observable<boolean>();
		this.subscription = new Subscription();
		this.customers = new MatTableDataSource<CustomerModel>([]);
	}

	ngOnInit(): void {
		this.store.dispatch(CustomerActions.beginLoadingCustomers());
		this.isLoading = this.store.select(fromCustomers.selectIsLoading);
		this.subscription.add(
			this.store.select(fromCustomers.selectAllCustomers).subscribe(customers => {
				this.customers.data = customers;
				this.customers.paginator = this.paginator;
			})
		);
	}

	deleteCustomer(customer: CustomerModel) {
		this.store.dispatch(CustomerActions.showDeleteCustomerDialog({customer}));
	}

	editCustomer(customer: CustomerModel) {
		this.store.dispatch(CustomerActions.showEditCustomerDialog({customer}));
	}

	filterActions(customer: CustomerModel, filterValue: string): boolean {
		return customer.companyName.toLowerCase().includes(filterValue)
			|| customer.contactNumber.includes(filterValue)
			|| customer.description.toLowerCase().includes(filterValue)
			|| customer.email.toLowerCase().includes(filterValue)
			|| customer.firstName.toLowerCase().includes(filterValue)
			|| customer.lastName.toLowerCase().includes(filterValue)
			|| customer.notes.toLowerCase().includes(filterValue);
	}
}
