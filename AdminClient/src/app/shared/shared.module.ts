import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';



@NgModule({
  declarations: [
    TableFilterComponent,
    PopupDialogComponent,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],

})
export class SharedModule { }
