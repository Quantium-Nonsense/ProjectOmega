import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { pipe, Subscription } from 'rxjs';
import { getAllCustomers } from '../customers/store/customers.actions';

import * as fromCustomers from '../customers/store/customers.reducer';

import { CustomerModel } from '../models/customers/customer.model';
import { OrderModel } from '../models/orders/order.model';
import { ProductModel } from '../models/products/products.model';
import { getAllProducts } from '../products/store/products.actions';
import { selectAllProducts } from '../products/store/products.reducer';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { UserModel } from '../shared/model/user/user.model';
import { beginProgressBar } from '../toolbar/store/toolbar.actions';
import { getAllUsers } from '../user/store/user.actions';
import * as fromUsers from '../user/store/user.reducer';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { createNewOrder, getAllOrders } from './store/order.actions';
import { selectAllOrders } from './store/order.reducer';

@Component({
  selector: 'app-products',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dateCreated', 'products', 'totalPrice', 'status', 'actions'];
  dataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);

  private subscriptions = new Subscription();
  private repUsers: UserModel[];
  private customers: CustomerModel[];
  private users: UserModel[];
  private products: ProductModel[];

  constructor(
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private store$: Store
  ) {
  }

  ngOnInit() {
    this.store$.dispatch(beginProgressBar());
    this.store$.dispatch(getAllOrders());
    this.store$.dispatch(getAllCustomers());
    this.store$.dispatch(getAllUsers());
    this.store$.dispatch(getAllProducts());

    this.subscriptions.add(
        this.store$.select(pipe(selectAllOrders)).subscribe(orders => {
          this.dataSource.data = orders;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

    this.subscriptions.add(
        this.store$.pipe(select(selectAllProducts)).subscribe(prods => this.products = prods)
    );

    this.subscriptions.add(
        this.store$.pipe(select(fromUsers.selectRepUsers)).subscribe(reps => this.repUsers = reps)
    );
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleReadDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '1000px',
      width: '80vw',
      data: {
        order,
        title: `Details for Order ${ order.id }`,
        editable: false,
        customers: this.customers,
        repUsers: this.repUsers,
        products: this.products
      }
    });
  }

  handleEditDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '1000px',
      width: '80vw',
      data: {
        order,
        title: `Edit Order ${ order.id }`,
        editable: true,
        customers: this.customers,
        repUsers: this.repUsers,
        products: this.products
      }
    });

    this.subscriptions.add(
        dialogRef.afterClosed().subscribe((updatedOrder: OrderModel) => {
          if (updatedOrder && !updatedOrder.equalsWithoutId(order)) {
            this.snackBar.open(`Order ${ updatedOrder.id } was successfully updated`, 'Close', { duration: 3000 });
          } else {
            this.snackBar.open(`Order ${ updatedOrder.id } was not updated as no changes were saved`, 'Close', { duration: 3000 });
          }
        })
    );
  }

  handleCreate() {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      maxWidth: '1000px',
      width: '80vw',
      data: {
        product: null,
        title: 'Create new order',
        editable: true,
        customers: this.customers,
        repUsers: this.repUsers,
        products: this.products
      }
    });

    this.subscriptions.add(
        dialogRef.afterClosed().subscribe(newOrder => {
          if (newOrder) {
            this.store$.dispatch(createNewOrder({order: newOrder}))
          } else {
            this.snackBar.open('Order was not placed', 'Close', { duration: 3000 });
          }
        })
    );
  }

  handleDeleteDetails(order: OrderModel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '66vw',
      data: order.id
    });

    this.subscriptions.add(
        dialogRef.afterClosed().subscribe(willDelete => {
          if (willDelete) {
            // this.ordersAPI.deleteById(order.id);
            this.snackBar.open(`Order ${ order.id } was successfully deleted`, 'Close', { duration: 3000 });
          } else {
            this.snackBar.open(`Order ${ order.id } was not deleted`, 'Close', { duration: 3000 });
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
      || orderProduct.product.supplier.companyName.includes(filterValue)
      || orderProduct.client.companyName.includes(filterValue)
      || orderProduct.client.firstName.includes(filterValue)
      || orderProduct.client.lastName.includes(filterValue)
      ).length > 0;

  private getDateString(date: Date) {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}
