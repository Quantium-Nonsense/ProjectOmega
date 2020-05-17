import {Component, OnInit, inject, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomerModel} from '../models/customers/customer.model';
import {ManagementDialogComponent} from './management-dialog/management-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  customers: CustomerModel[] = [];
  representative: string;

  constructor(public dialog: MatDialog) {
    this.customers.push(new CustomerModel(0, 'company1', '0', 'no',
      'email', 'Damian', 'Bigman', 'notes'));
    this.customers.push(new CustomerModel(0, 'company2', '0', 'no',
      'email', 'Abe', 'Mountain', 'notes'));
  }

  ngOnInit(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManagementDialogComponent, {
      width: '250px',
      data: {name: this.representative}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.representative = result;
    });
  }
}

