import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import { Product, ProductsDataSource } from '../../data/products/products-datasource';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Product>;
  dataSource: ProductsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['supplier', 'name', 'description', 'price', 'actions'];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.dataSource = ProductsDataSource.getInstance();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  handleReadDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: {product, title: `Details for ${product.name}`, editable: false}
    });
  }

  handleEditDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: {product, title: `Edit ${product.name}`, editable: true}
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct && !ProductsDataSource.equalsWithoutId(product, updatedProduct)) {
        this.dataSource.updateItem(updatedProduct);
        this.snackBar.open(`${updatedProduct.name} was successfully updated`, 'Close', {duration: 3000});
      } else {
        this.snackBar.open(`${updatedProduct.name} was not updated as no changes were saved`, 'Close', {duration: 3000});
      }
    });
  }

  handleCreate() {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      width: '500px',
      data: {
        product: null,
        title: 'Create new product',
        editable: true
      }
    });

    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        newProduct.id = this.dataSource.getNextId();
        this.dataSource.addItem(newProduct);
        this.snackBar.open(`${newProduct.name} was successfully added`, 'Close', {duration: 3000});
      } else {
        this.snackBar.open(`${newProduct.name} was not updated as no changes were made`, 'Close', {duration: 3000});
      }
    });
  }

  handleDeleteDetails(product: Product) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: product.name,
    });

    dialogRef.afterClosed().subscribe(willDelete => {
      if (willDelete) {
        this.dataSource.deleteById(product.id);
        this.snackBar.open(`${product.name} was successfully deleted`, 'Close', {duration: 3000});
      } else {
        this.snackBar.open(`${product.name} was not deleted`, 'Close', {duration: 3000});
      }
    });
  }
}
