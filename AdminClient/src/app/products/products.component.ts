import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

import { Product, ProductsDataSource } from './products-datasource';

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

  handleReadDetails(id: number) {
    this.router.navigate(['./', 'details', id]);
  }

  handleEditDetails(id: number) {
    this.router.navigate(['./', 'edit', id]);
  }

  handleCreate() {
    this.router.navigate(['./', 'new']);
  }

  handleDeleteDetails(id: number) {
    const data = this.dataSource.getItemById(id);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: data.name,
    });

    dialogRef.afterClosed().subscribe(willDelete => {
      if (willDelete) {
        this.dataSource.deleteById(id);
        this.snackBar.open(`${data.name} was successfully deleted`, 'Close', {duration: 3000});
      } else {
        this.snackBar.open(`${data.name} was not deleted`, 'Close', {duration: 3000});
      }
    });
  }
}
