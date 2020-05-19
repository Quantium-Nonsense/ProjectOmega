import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../reducers/index';
import { SupplierModel } from '../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';
import * as SupplierActions from './store/suppliers.actions';
import * as fromSuppliers from './store/suppliers.reducer';
import * as fromToolbar from '../toolbar/store/toolbar.reducer';

@Component({
  selector: 'app-suppliers',
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
    this.store$.dispatch(ToolbarActions.beginProgressBar());
    this.store$.dispatch(SupplierActions.beginLoadingSuppliers());
    this.isLoading = this.store$.select(fromToolbar.selectShowProgressBar);
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
    this.store$.dispatch(SupplierActions.showEditSupplier({ supplier }));
  }

  deleteSupplier(supplier: SupplierModel) {
    this.store$.dispatch(SupplierActions.showDeleteSupplier({ focusedSupplier: supplier }));
  }

  handleCreate(): void {
    this.store$.dispatch(SupplierActions.showCreateNewSupplierDialog())
  }
}
