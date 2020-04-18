import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [],
  imports: [
    FlexLayoutModule,
    CommonModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
