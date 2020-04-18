import { Component, OnInit, Output } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayColumns: string[] = ['name', 'category', 'email', 'country'];
  customers: Customer[];
  inputName: string;
  @Output() data;

  constructor(private customerService: CustomersService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.customerService.getCustomers()
      .pipe(delay(2000)).subscribe(customers => this.customers = customers);
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
