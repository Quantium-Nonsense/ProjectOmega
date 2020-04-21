import {Component, Input, OnInit, Output} from '@angular/core';
import { delay } from 'rxjs/operators';
import { CustomerModel } from '../models/customers/customer.model';
import { CustomersService } from '../customers.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatInput} from '@angular/material/input';

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

  constructor(private customerService: CustomersService) {
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.customers);
  }

  getData(): void {
    this.customerService.getCustomers()
      .pipe(delay(2000)).subscribe(customers => this.customers = new MatTableDataSource(customers));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // get filter input value
    this.customers.filter = filterValue.trim().toLowerCase(); // .filter table for value
    console.log('Filter ran')
  }

  updateCustomerRecord(id: number, column: string, newEntry: string): void {
    this.customerService.updateCustomerRecord(id, column, newEntry)
      .subscribe();
  }

  openLoadRecordDialog(): void {
    this.getData(); // no input dialog here, therefore instant data call (no input needed)
    this.data = 'load';
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
