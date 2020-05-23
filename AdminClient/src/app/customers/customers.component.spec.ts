import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerModel } from '../models/customers/customer.model';
import * as fromApp from '../reducers';
import { emptyState } from '../shared/empty.state';
import { SharedModule } from '../shared/shared.module';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';

import { CustomersComponent } from './customers.component';
import * as CustomerActions from './store/customers.actions';
import { CustomersEffects } from './store/customers.effects';
import * as fromCustomers from './store/customers.reducer';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;


  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let mockStore: MockStore<fromApp.State>;
  let effects: CustomersEffects;
  let actions$: Observable<Action>;

  let selectAllCustomersSelector: MemoizedSelector<fromCustomers.State, CustomerModel[]>;
  let selectSelectedCustomerSelector: MemoizedSelector<fromCustomers.State, CustomerModel>;
  let isLoadingSelector: MemoizedSelector<fromCustomers.State, boolean>;

  const createDummyCustomers = (): CustomerModel[] => {
    const dummyCustomers: CustomerModel[] = [];
    for (let i = 0; i < 50; i++) {
      dummyCustomers.push({
        contactNumber: i.toString(),
        description: `Amazing client ${ i }`,
        email: `bla${ i }@bla.com`,
        firstName: `FirstName${ i }`,
        lastName: `FirstName${ i }`,
        id: i,
        companyName: `Company ${ i }`,
        notes: 'bla and mac bla'
      });
    }
    return dummyCustomers;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
             declarations: [CustomersComponent],
             providers: [
               provideMockStore<fromApp.State>({
                 initialState: emptyState
               }),
               provideMockActions(() => actions$),
               CustomersEffects
             ],
             imports: [
               MatSnackBarModule,
               SharedModule,
               BrowserModule,
               NoopAnimationsModule
             ]
           })
           .compileComponents();
  });

  afterEach(async () => {
    try {
      const matDialog = await documentLoader.getHarness(MatDialogHarness);
      await matDialog.close();
    } catch (e) {
      // Ignore as this just means not found
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject(CustomersEffects);

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    selectAllCustomersSelector = mockStore.overrideSelector(
        fromCustomers.selectAllCustomers,
        []
    );

    mockStore.refreshState();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure table displays rows', async () => {
    component.ngOnInit();
    selectAllCustomersSelector.setResult(createDummyCustomers());

    mockStore.refreshState();
    fixture.detectChanges();

    const table = await loader.getHarness(MatTableHarness);
    const tableRows = await table.getRows();

    expect(tableRows.length).toBe(10); // Due to paginator
  });

  it('should load all customers when landing on dashboard and dashboard loading', () => {
    const customers = createDummyCustomers();
    const httpSpy = spyOn(effects, 'httpGetAllCustomers').and.callThrough().and.returnValue(
        cold('--a|', {
          a: customers
        })
    );

    actions$ = hot('--a-b', {
      a: ToolbarActions.beginProgressBar(),
      b: CustomerActions.getAllCustomers()
    });

    const expected = hot('------(ab)', {
      a: CustomerActions.customersLoaded({ customers }),
      b: ToolbarActions.stopProgressBar()
    });

    expect(effects.loadAllCustomers$).toBeObservable(expected);
  });

  it('should present a toast error message if failed to get all customers', async () => {
    const httpSpy = spyOn(effects, 'httpGetAllCustomers').and.callThrough().and.returnValue(
        cold('--#|', null, new Error('error boes brrr'))
    );

    actions$ = hot('---a', {
      a: CustomerActions.getAllCustomers()
    });

    const expected = hot('-----a', {
      a: ToolbarActions.stopProgressBar()
    });

    effects.loadAllCustomers$.subscribe(); // Fixture wont detect changes without this
    expect(effects.loadAllCustomers$).toBeObservable(expected);

    const toast = await documentLoader.getHarness(MatSnackBarHarness);
    expect(toast).toBeTruthy();

    const host = await toast.host();
    const text = await host.text();

    expect(text).toEqual('error boes brrr');
  });

  it('should show delete customer dialog on showDeleteCustomerDialog dispatch', async () => {
    const selectedCustomer = createDummyCustomers()[0];
    actions$ = of(CustomerActions.showDeleteCustomerDialog({
      customer: selectedCustomer
    }));

    effects.showDeleteCustomerDialog$.subscribe(); // No dispatch

    const dialog = await documentLoader.getHarness(MatDialogHarness);
    const dialogHost = await dialog.host();
    const dialogText = await dialogHost.text();

    expect(dialogText.includes(environment.common.DELETE_CUSTOMER_CONFIRM_TEXT)).toBeTrue();
  });

  it('should show edit customer dialog on showEditCustomerDialog dispatch', async () => {
    const selectedCustomer: CustomerModel = createDummyCustomers()[0];
    actions$ = of(CustomerActions.showEditCustomerDialog({ customer: selectedCustomer }));

    effects.showEditCustomerDialog$.subscribe(); // no dispatch

    const dialog = await documentLoader.getHarness(MatDialogHarness);

    expect(dialog).toBeTruthy(); // Check confirm button exists
  });
});
