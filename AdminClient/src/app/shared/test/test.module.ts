import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopupDialogComponent } from '../components/popup-dialog/popup-dialog.component';
import { TableFilterComponent } from '../components/table-filter/table-filter.component';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [
    TableFilterComponent,
    PopupDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TableFilterComponent,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatModule
  ]
})
export class TestModule { }
