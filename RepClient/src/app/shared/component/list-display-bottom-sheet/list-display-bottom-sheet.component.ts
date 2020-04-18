import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ListDisplayDataModel } from './model/list-display-data.model';

@Component({
  selector: 'app-list-display-bottom-sheet',
  templateUrl: './list-display-bottom-sheet.component.html',
  styleUrls: ['./list-display-bottom-sheet.component.scss']
})
export class ListDisplayBottomSheetComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: ListDisplayDataModel) {
  }

  ngOnInit(): void {
  }

}
