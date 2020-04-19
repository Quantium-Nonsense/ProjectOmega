import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableFilterComponent } from './components/table-filter/table-filter.component';



@NgModule({
  declarations: [
    TableFilterComponent,
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    TableFilterComponent,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
