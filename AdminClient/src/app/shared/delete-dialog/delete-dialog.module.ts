import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog.component';

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexModule,
    MatButtonModule
  ],
  entryComponents: [DeleteDialogComponent]
})
export class DeleteDialogModule {
}

