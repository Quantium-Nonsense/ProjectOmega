import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CustomerModel } from '../models/customers/customer.model';
import * as fromApp from '../reducers/index';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';
import { selectIsProgressBarVisible } from '../toolbar/store/toolbar.reducer';
import * as CustomerActions from './store/customers.actions';
import * as fromCustomers from './store/customers.reducer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayColumns: string[] = ['companyName', 'email', 'contactNumber', 'actions'];
  customers: MatTableDataSource<CustomerModel>;

  private subscription: Subscription;

  constructor(
      private store$: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
    this.customers = new MatTableDataSource<CustomerModel>([]);
  }

  ngOnInit(): void {
    this.store$.dispatch(ToolbarActions.beginProgressBar());
    this.store$.dispatch(CustomerActions.getAllCustomers());

    this.subscription.add(
        this.store$.select(fromCustomers.selectAllCustomers).subscribe(customers => {
          this.customers.data = customers;
          this.customers.paginator = this.paginator;
        })
    );
  }

  deleteCustomer(customer: CustomerModel) {
    this.store$.dispatch(CustomerActions.showDeleteCustomerDialog({ customer }));
  }

  editCustomer(customer: CustomerModel) {
    this.store$.dispatch(CustomerActions.showEditCustomerDialog({ customer }));
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

  handleCreate() {
    this.store$.dispatch(CustomerActions.showEditCustomerDialog({ customer: null }));
  }

  ngOnDestroy(): void {
  }
}
