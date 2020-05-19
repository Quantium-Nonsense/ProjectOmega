import {Component, OnInit, inject, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerModel} from '../models/customers/customer.model';
import {ManagementDialogComponent} from './management-dialog/management-dialog.component';
import {CustomerManagementModel} from '../models/customers/management/customer-management.model';

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
  customers: CustomerModel[] = [];
  customerRepList: CustomerManagementModel[] = [];

  constructor(public dialog: MatDialog) {
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

    let selectedId = id;
    const dialogRef = this.dialog.open(ManagementDialogComponent, {
      width: '250px',
      data: {representative: this.customerRepList[selectedId].assignedRepresentative, id: selectedId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

