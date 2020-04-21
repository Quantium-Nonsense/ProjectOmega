import {Component, Input, OnInit, Output} from '@angular/core';
import {delay} from 'rxjs/operators';
import {CustomerModel} from '../models/customers/customer.model';
import {CustomersService} from '../customers.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatInput} from '@angular/material/input';
import {Store} from '@ngrx/store';
import * as fromApp from '../reducers/index';
import * as CustomerActions from './store/customers.actions';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	displayColumns: string[] = ['name', 'category', 'email', 'country', 'actions'];
	// customers: CustomerModel[];
	customers: MatTableDataSource<CustomerModel>;
	searchFormControl = new FormControl('');
	@Output() data;

	constructor(
		private store: Store<fromApp.State>
	) {
	}

	ngOnInit(): void {
		this.store.dispatch(CustomerActions.beginLoadingCustomers());
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value; // get filter input value
		this.customers.filter = filterValue.trim().toLowerCase(); // .filter table for value
		console.log('Filter ran');
	}

	openCreateRecordDialog(): void {
		this.data = 'create';
	}

	openUpdateRecordDialog(): void {
		this.data = 'update';
	}

	openDeleteRecordDialog(): void {
		this.data = 'delete';
	}
}
