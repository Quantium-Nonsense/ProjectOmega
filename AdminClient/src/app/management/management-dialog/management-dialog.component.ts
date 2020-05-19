import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData, ManagementComponent} from '../management.component';
import {CustomerManagementModel} from '../../models/customers/management/customer-management.model';

@Component({
  selector: 'app-management-dialog',
  templateUrl: './management-dialog.component.html',
  styleUrls: ['./management-dialog.component.scss']
})
export class ManagementDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {} // injection token for data access

  ngOnInit(): void {
  }

  // Closes the dialog on cancel button, no data sent to management component
  cancel() {
    this.dialogRef.close();
  }
}
