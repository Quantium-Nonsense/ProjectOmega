import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDialogDataModel } from '../../model/popup-dialog-data.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PopupDialogDataModel) {

  }

}
