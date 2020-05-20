import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MockOrdersAPI } from '../../data/orders/orders-data';
import { CustomerModel } from '../models/customers/customer.model';
import { OrderModel } from '../models/orders/order.model';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { UserModel } from '../shared/model/user/user.model';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

import * as fromCustomers from '../customers/store/customers.reducer';
import * as fromUsers from '../user/store/user.reducer';

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
  displayedColumns = ['dateCreated', 'products', 'totalPrice', 'status', 'actions'];
  dataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);

  private subscriptions = new Subscription();

  private ordersAPI = MockOrdersAPI.getInstance();

  private ordersObservable: Observable<OrderModel[]>;

  private customers: CustomerModel[];
  private users: UserModel[];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store$: Store,
  ) {
  }

  ngOnInit() {
    this.ordersObservable = this.ordersAPI.getAllAsObservable();
    this.subscriptions.add(
      this.ordersObservable.subscribe(ordersList => {
        this.dataSource.data = ordersList;
      })
    );

    this.subscriptions.add(
      this.store$.select(fromCustomers.selectAllCustomers).subscribe((customers: CustomerModel[]) => {
        this.customers = customers;
      })
    );

    this.subscriptions.add(
      this.store$.select(fromUsers.selectUsers).subscribe((users: UserModel[]) => {
        this.users = users;
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
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { order, title: `Details for ${order.id}`, editable: false, customers: this.customers, users: this.users }
    });
  }

  handleEditDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: { order, title: `Edit Order ${order.id}`, editable: true, customers: this.customers, users: this.users }
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
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '500px',
      width: '66vw',
      data: {
        product: null,
        title: 'Create new order',
        editable: true,
        customers: this.customers,
        users: this.users
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
    order.status.toLowerCase().includes(filterValue)
    || order.totalOrderPrice.toString().includes(filterValue)
    || order.dateCreated.toString().includes(filterValue)
    || order.orderProducts.filter(
    orderProduct => orderProduct.product.name.includes(filterValue)
      || orderProduct.product.supplier.includes(filterValue)
      || orderProduct.client.companyName.includes(filterValue)
      || orderProduct.client.firstName.includes(filterValue)
      || orderProduct.client.lastName.includes(filterValue)
    ).length > 0;

  private getDateString(date: Date) {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}
