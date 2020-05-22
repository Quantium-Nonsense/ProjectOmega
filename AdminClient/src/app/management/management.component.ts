import { Component, OnInit, inject, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerModel } from '../models/customers/customer.model';
import { ManagementDialogComponent } from './management-dialog/management-dialog.component';
import { CustomerManagementModel } from '../models/customers/management/customer-management.model';
import { ChartComponent } from '../chart/chart.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../reducers/index';

export interface DialogData {
  representative: string;
  id: string;
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  private subscription = new Subscription();
  private customers: CustomerModel[] = []; // customer data model
  private customerRepList: CustomerManagementModel[] = []; // for mapping customers with rep

  // initialize customer sets
  constructor(private store$: Store<fromApp.State>, public dialog: MatDialog) {
    this.subscription = new Subscription();

    this.customers.push(new CustomerModel(0, 'company1', '0', 'no',
      'email', 'Damian', 'Bigman', 'notes'));
    this.customers.push(new CustomerModel(1, 'company2', '1', 'no',
      'email', 'Abe', 'Mountain', 'notes'));

    for (let i = 0; i < this.customers.length; i++) {
      this.customerRepList.push(new CustomerManagementModel(this.customers[i].id, 'none'))
    }
  }

  ngOnInit(): void {

  }

  openDialog(id: number): void {
    const selectedId = id;
    const dialogRef = this.dialog.open(ManagementDialogComponent, { // dialog reference
      width: '250px',
      data: {representative: this.customerRepList[selectedId].assignedRepresentative, id: selectedId} // data share for dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if the result is true -> save data
        this.customerRepList[selectedId].assignedRepresentative = result;
      }
    });
  }
}

