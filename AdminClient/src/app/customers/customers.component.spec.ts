import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {CustomersComponent} from './customers.component';
import {HarnessLoader} from '@angular/cdk/testing';
import * as fromApp from '../reducers';
import {Observable, of} from 'rxjs';
import {Action, MemoizedSelector} from '@ngrx/store';
import {CustomersEffects} from './store/customers.effects';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {CustomerModel} from '../models/customers/customer.model';
import * as fromCustomers from './store/customers.reducer';
import {MatTableHarness} from '@angular/material/table/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import * as CustomerActions from './store/customers.actions';
import {environment} from '../../environments/environment';

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
				description: `Amazing client ${i}`,
				email: `bla${i}@bla.com`,
				firstName: `FirstName${i}`,
				lastName: `FirstName${i}`,
				id: i,
				companyName: `Company ${i}`,
				notes: 'bla and mac bla'
			});
		}
		return dummyCustomers;
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				   declarations: [CustomersComponent],
				   providers: [
					   MatDialogHarness,
					   provideMockStore({
						   initialState: {
							   customers: null
						   }
					   }),
					   provideMockActions(() => actions$),
					   CustomersEffects
				   ],
				   imports: [
					   SharedModule,
					   NoopAnimationsModule
				   ]
			   })
			   .compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		mockStore = TestBed.inject(MockStore);
		effects = TestBed.inject(CustomersEffects);

		loader = TestbedHarnessEnvironment.loader(fixture);
		documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

		isLoadingSelector = mockStore.overrideSelector(
			fromCustomers.selectIsLoading,
			false
		);

		selectAllCustomersSelector = mockStore.overrideSelector(
			fromCustomers.selectAllCustomers,
			[]
		);

		selectSelectedCustomerSelector = mockStore.overrideSelector(
			fromCustomers.selectSelectedCustomer,
			undefined
		);
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

	it('should load all customers when landing on dashboard', () => {
		actions$ = of(CustomerActions.beginLoadingCustomers());
		const dummyCustomers = createDummyCustomers();
		spyOn(effects, 'createDummyCustomers').and.callThrough().and.returnValue(dummyCustomers);
		effects.loadAllCustomers$.subscribe(action => {
			expect(action).toEqual(CustomerActions.customersLoaded({customers: dummyCustomers}));
		});
	});

	it('should show delete custoemr dialog on showDeleteCustomerDialog dispatch', async () => {
		const selectedCustomer = createDummyCustomers()[0];
		actions$ = of(CustomerActions.showDeleteCustomerDialog({customer: selectedCustomer}));

		effects.showDeleteCustomerDialog$.subscribe(); // No dispatch

		const dialog = await documentLoader.getHarness(MatDialogHarness);
		const dialogHost = await dialog.host();
		const dialogText = await dialogHost.text();

		expect(dialogText.includes(environment.common.DELETE_CUSTOMER_CONFIRM_TEXT)).toBeTrue();
	});

	// Commented out as Cdk export is having issues with angular 9+
	/* it('should show edit customer dialog on showEditCustomerDialog dispatch', async () => {
	 const selectedCustomer = createDummyCustomers()[0];
	 actions$ = of(CustomerActions.showEditCustomerDialog({customer: selectedCustomer}));

	 effects.showEditCustomerDialog$.subscribe(); // no dispatch

	 const dialog = await documentLoader.getHarness(MatDialogHarness);
	 const dialogHost = await dialog.host();
	 const dialogText = await dialogHost.text();

	 expect(dialogText.includes(environment.common.CONFIRMATION_TEXT)); // Check confirm button exists
	 });*/
});
