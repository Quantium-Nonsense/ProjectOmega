import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { MockProductsAPI } from '../../data/products/products-data';
import { ProductModel } from '../models/products/products.model';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['supplier', 'name', 'description', 'price', 'actions'];
  dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);

  private subscriptions = new Subscription();

  private productsAPI = MockProductsAPI.getInstance();

  private productsObservable: Observable<ProductModel[]>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.productsObservable = this.productsAPI.getAllAsObservable();
    this.subscriptions.add(
      this.productsObservable.subscribe(productsList => {
        this.dataSource.data = productsList;
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
eslint
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleReadDetails(product: ProductModel) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { product, title: `Details for ${product.name}`, editable: false }
    });
  }

  handleEditDetails(product: ProductModel) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { product, title: `Edit ${product.name}`, editable: true }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(updatedProduct => {
        if (updatedProduct && !updatedProduct.equalsWithoutId(product)) {
          this.productsAPI.updateItem(updatedProduct);
          this.snackBar.open(`${updatedProduct.name} was successfully updated`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(`${updatedProduct.name} was not updated as no changes were saved`, 'Close', { duration: 3000 });
        }
      })
    );
  }

  handleCreate() {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: {
        product: null,
        title: 'Create new product',
        editable: true
      }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(newProduct => {
        if (newProduct) {
          newProduct.id = this.productsAPI.getNextId();
          this.productsAPI.addItem(newProduct);
          this.snackBar.open(`${newProduct.name} was successfully added`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(`${newProduct.name} was not updated as no changes were made`, 'Close', { duration: 3000 });
        }
      })
    );
  }

  handleDeleteDetails(product: ProductModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '66vw',
      data: product.name,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(willDelete => {
        if (willDelete) {
          this.productsAPI.deleteById(product.id);
          this.snackBar.open(`${product.name} was successfully deleted`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(`${product.name} was not deleted`, 'Close', { duration: 3000 });
        }
      })
    );
  }

  handleFilter = (product: ProductModel, filterValue: string): boolean =>
    product.supplier.toLowerCase().includes(filterValue)
    || product.name.toLowerCase().includes(filterValue)
    || product.description.toLowerCase().includes(filterValue)
    || product.price.toString().includes(filterValue);
}
