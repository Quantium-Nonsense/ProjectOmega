import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as fromApp from '../reducers/index';
import { Store } from '@ngrx/store';
import * as ClientActions from './store/suppliers.actions';
import { Observable, Subscription } from 'rxjs';
import * as fromSuppliers from './store/suppliers.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierModel } from '../shared/model/supplier/supplier.model';
import { MatPaginator } from '@angular/material/paginator';
import * as SupplierActions from './store/suppliers.actions';

@Component({
  selector: 'app-clients',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: Observable<boolean>;
  suppliers: MatTableDataSource<SupplierModel>;
  displayCols: string[] = ['companyName', 'contactNumber', 'email', 'firstName', 'lastName', 'actions'];

  private sub: Subscription;

  constructor(
      private store$: Store<fromApp.State>
  ) {
    this.suppliers = new MatTableDataSource<SupplierModel>([]);
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    // Load all supplier
    this.store$.dispatch(ClientActions.beginLoadingSuppliers());
    this.isLoading = this.store$.select(fromSuppliers.selectIsLoading);
    this.sub.add(
        this.store$.select(fromSuppliers.selectAllSuppliers).subscribe((suppliers: SupplierModel[]) => {
          this.suppliers.data = suppliers;
          this.suppliers.paginator = this.paginator;
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  filterActions(data: SupplierModel, filterValue: string): boolean {
    return data.email.toLowerCase().includes(filterValue)
        || data.notes.toLowerCase().includes(filterValue)
        || data.lastName.toLowerCase().includes(filterValue)
        || data.firstName.toLowerCase().includes(filterValue)
        || data.description.toLowerCase().includes(filterValue);
  }

  editSupplier(supplier: SupplierModel) {
    this.store$.dispatch(SupplierActions.showEditSupplier({focusedSupplier: supplier}));
  }

  deleteSupplier(supplier: SupplierModel) {
    this.store$.dispatch(SupplierActions.showDeleteSupplier({focusedSupplier: supplier}));
  }
}
