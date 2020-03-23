import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { Observable, of} from 'rxjs';
import { CustomersService} from '../customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.customerService.getCustomers()
      .pipe(delay(2000)).subscribe(customers => this.customers = customers);
  }

  private updateCustomerRecord(id: number, column: string, newEntry: string): void {
    this.customerService.updateCustomerRecord(id, column, newEntry)
      .subscribe();
  }

}
