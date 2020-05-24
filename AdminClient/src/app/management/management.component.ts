import { Component, OnInit, inject, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerModel } from '../models/customers/customer.model';
import { ManagementDialogComponent } from './management-dialog/management-dialog.component';
import { CustomerManagementModel } from '../models/customers/management/customer-management.model';
import { ChartComponent } from '../chart/chart.component';
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
  private customers: CustomerModel[] = []; // customer data model
  private customerRepList: CustomerManagementModel[] = []; // for mapping customers with rep

  // initialize customer sets
  constructor(public dialog: MatDialog) {
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

