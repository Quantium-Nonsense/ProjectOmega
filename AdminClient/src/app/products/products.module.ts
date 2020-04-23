import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {DeleteDialogModule} from '../shared/delete-dialog/delete-dialog.module';
import {ProductDetailsDialogComponent} from './product-details-dialog/product-details-dialog.component';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailsDialogComponent],
  imports: [
    CommonModule,
    DeleteDialogModule,
    ProductsRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    FlexModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [ProductsComponent]
})
export class ProductsModule {
}
