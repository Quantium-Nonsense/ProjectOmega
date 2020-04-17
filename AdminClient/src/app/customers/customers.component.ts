import {Component, Inject, OnInit, Output} from '@angular/core';
import { Customer } from '../customer';
import { Observable, of } from 'rxjs';
import { CustomersService } from '../customers.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent} from './dialog-body/dialog-body.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

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
