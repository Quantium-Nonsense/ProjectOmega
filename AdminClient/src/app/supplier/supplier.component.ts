import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import * as fromApp from '../reducers/index';
import { getSessionID } from '../session-id';
import { SupplierModel } from '../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';
import * as fromToolbar from '../toolbar/store/toolbar.reducer';
import * as SupplierActions from './store/suppliers.actions';
import * as fromSuppliers from './store/suppliers.reducer';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean;
  suppliers: MatTableDataSource<SupplierModel>;
  displayCols: string[] = ['companyName', 'contactNumber', 'email', 'firstName', 'lastName', 'actions', 'id'];

  private sub: Subscription;

  constructor(
      private store$: Store<fromApp.State>,
      private logger: NGXLogger,
  ) {
    this.suppliers = new MatTableDataSource<SupplierModel>([]);
    this.sub = new Subscription();
    this.logger.info(`Session ID: ${getSessionID()} - Constructing supplier screen`);
  }

  ngOnInit(): void {
    // Load all supplier
    this.logger.info(`Session ID: ${getSessionID()} - Initializing supplier screen`);
    this.store$.dispatch(ToolbarActions.beginProgressBar());
    this.store$.dispatch(SupplierActions.beginLoadingSuppliers());
    this.sub.add(
        this.store$.select(fromToolbar.selectIsProgressBarVisible).subscribe(loading => this.isLoading = loading)
    );
    this.sub.add(
        this.store$.select(fromSuppliers.selectAllSuppliers).subscribe((suppliers: SupplierModel[]) => {
          this.suppliers.data = suppliers;
          this.suppliers.paginator = this.paginator;
          this.logger.info(`Session ID: ${getSessionID()} - Loaded suppliers`);
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.logger.info(`Session ID: ${getSessionID()} - Destorying suppliers screen`);
  }


  filterActions(data: SupplierModel, filterValue: string): boolean {
    return data.email.toLowerCase().includes(filterValue)
           || data.notes.toLowerCase().includes(filterValue)
           || data.lastName.toLowerCase().includes(filterValue)
           || data.firstName.toLowerCase().includes(filterValue)
           || data.description.toLowerCase().includes(filterValue);
  }

  editSupplier(supplier: SupplierModel) {
    this.logger.info(`Session ID: ${getSessionID()} - Opening edit supplier dialog`);
    this.store$.dispatch(SupplierActions.showEditSupplier({ supplier }));
  }

  deleteSupplier(supplier: SupplierModel) {
    this.logger.info(`Session ID: ${getSessionID()} - Opening delete supplier dialog`);
    this.store$.dispatch(SupplierActions.showDeleteSupplier({ supplier }));
  }

  handleCreate(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Opening create supplier dialog`);
    this.store$.dispatch(SupplierActions.showCreateNewSupplierDialog());
  }
}
