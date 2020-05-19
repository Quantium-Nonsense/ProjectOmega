import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { MockOrdersAPI } from '../../data/orders/orders-data';
import { OrderModel } from '../models/orders/order.model';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { ProductDetailsDialogComponent } from './order-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<OrderModel>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateCreated', 'user', 'products', 'totalPrice', 'status', 'actions'];
  dataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);

  private subscriptions = new Subscription();

  private ordersAPI = MockOrdersAPI.getInstance();

  private ordersObservable: Observable<OrderModel[]>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.ordersObservable = this.ordersAPI.getAllAsObservable();
    this.subscriptions.add(
      this.ordersObservable.subscribe(ordersList => {
        this.dataSource.data = ordersList;
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleReadDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { order, title: `Details for ${order.id}`, editable: false }
    });
  }

  handleEditDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { order, title: `Edit ${order.name}`, editable: true }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(updatedOrder => {
        if (updatedOrder && !updatedOrder.equalsWithoutId(order)) {
          this.ordersAPI.updateItem(updatedOrder);
          this.snackBar.open(`Order ${updatedOrder.id} was successfully updated`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(`Order ${updatedOrder.id} was not updated as no changes were saved`, 'Close', { duration: 3000 });
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
      dialogRef.afterClosed().subscribe(newOrder => {
        if (newOrder) {
          newOrder.id = this.ordersAPI.getNextId();
          this.ordersAPI.addItem(newOrder);
          this.snackBar.open('Order was successfully placed', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Order was not placed', 'Close', { duration: 3000 });
        }
      })
    );
  }

  handleDeleteDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '66vw',
      data: order.id,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(willDelete => {
        if (willDelete) {
          this.ordersAPI.deleteById(order.id);
          this.snackBar.open(`Order ${order.id} was successfully deleted`, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open(`Order ${order.id} was not deleted`, 'Close', { duration: 3000 });
        }
      })
    );
  }

  handleFilter = (order: OrderModel, filterValue: string): boolean =>
    order.supplier.toLowerCase().includes(filterValue)
    || order.name.toLowerCase().includes(filterValue)
    || order.description.toLowerCase().includes(filterValue)
    || order.price.toString().includes(filterValue);
}
