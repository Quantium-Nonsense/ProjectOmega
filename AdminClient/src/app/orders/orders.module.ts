import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DeleteDialogModule } from '../shared/delete-dialog/delete-dialog.module';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailsDialogComponent],
  imports: [
    CommonModule,
    DeleteDialogModule,
    OrdersRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatSortModule,
    FlexModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    MatDatepickerModule
  ],
  entryComponents: [OrdersComponent]
})
export class OrdersModule {
}
