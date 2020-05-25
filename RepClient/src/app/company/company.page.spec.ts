import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetHarness } from '@angular/material/bottom-sheet/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { ItemModel } from '../shared/model/company-items/item.model';
import { SupplierModel } from '../shared/model/home/supplier.model';
import { SortOptionsEnum } from '../shared/model/sort-options.enum';
import { SharedModule } from '../shared/shared.module';
import { mockEmptyState } from '../shared/test/empty-store-state.model';
import * as fromApp from './../reducers/index';
import { CompanyPage } from './company.page';
import * as CompanyActions from './store/company.actions';
import { CompanyEffects } from './store/company.effects';
import * as fromCompany from './store/company.reducer';

const createMockItems = (): ItemModel[] => {
  const supps: ItemModel[] = [];
  for (let i = 0; i < 50; i++) {
    supps.push({
      id: i.toString(),
      description: `Fancy company ${ i }`,
      name: `name ${ i }`,
      supplier: createMockCompanies()[0],
      companyId: `${ i }`,
      price: (i + 1) * 5
    });
  }

  return supps;
};
const createMockCompanies = (): SupplierModel[] => {
  const supps: SupplierModel[] = [];
  for (let i = 0; i < 50; i++) {
    supps.push({
      id: i,
      companyName: `Company ${ i }`,
      description: `Fancy company ${ i }`,
      email: `a@a${ i }.com`,
      firstName: `firstName${ i }`,
      lastName: `lastName${ i }`,
      contactNumber: `5435443${ i }`,
      address: `bla${ i }`,
      notes: `notes${ i }`,
      country: `country ${ i }`
    });
  }

  return supps;
};

describe('CompanyPage', () => {
  let component: CompanyPage;
  let fixture: ComponentFixture<CompanyPage>;

  let actions$: Observable<Action>;
  let mockStore: MockStore<fromApp.State>;
  let effects: CompanyEffects;
  let testScheduler: TestScheduler;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let navSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    navSpy = jasmine.createSpyObj<Router>(['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [CompanyPage],
      imports: [
        SharedModule,
        NoopAnimationsModule,
        IonicModule.forRoot(),
        LoggerTestingModule,
      ],
      providers: [
        { provide: Router, useValue: navSpy },
        CompanyEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: mockEmptyState
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyPage);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    testScheduler = new TestScheduler(((actual, expected) => {
      expect(actual).toEqual(expected);
    }));

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject<CompanyEffects>(CompanyEffects);
    mockStore.refreshState();

    fixture.detectChanges();
  }));

  it('should display bottom sheet', async () => {
    component.ngOnInit();
    component.ionViewWillEnter();
    fixture.detectChanges();

    const mockCompanies = createMockCompanies();
    actions$ = of(CompanyActions.showCompaniesBottomSheet({
      data: {
        action: (selectedCompany: SupplierModel) => {
        },
        companies: [
          ...mockCompanies
        ]
      }
    }));

    effects.showCompaniesOnBottomSheet$.subscribe(); // Trigger effect

    fixture.detectChanges();
    await fixture.whenStable();

    const bottomSheet = await documentLoader.getHarness(MatBottomSheetHarness); // Get the bottom sheet component
    const bottomSheetHost = await bottomSheet.host(); // Get the element
    const text = await bottomSheetHost.text(); // Get the text of the component

    await bottomSheet.dismiss(); // Ensure the bottom sheet is dismissed so it wont interfere with other tests;

    expect(text.includes('Company 1')).toEqual(true); // Check if part of the dummy text is there
  });

  it('should update the store with items of new company', () => {
    const supps = createMockCompanies();
    const items = createMockItems();

    spyOn(effects, 'httpGetAllItemsForCompany').and.callThrough().and.returnValue(cold('--a|', {
      a: items
    }));

    actions$ = hot('--a', { a: CompanyActions.loadItemsOfCompany({ company: supps[0] }) });

    const expected = hot('----(ab)', {
      a: CompanyActions.companySelected(),
      b: CompanyActions.itemsOfCompanyLoaded({ items })
    });

    expect(effects.getItemsOfSelectedCompany$).toBeObservable(expected);
  });

  it('should check when a company is selected redirect is triggered', () => {
    actions$ = of(CompanyActions.companySelected());

    effects.redirectToCompanyPage$.subscribe(); // trigger has no dispatch

    expect(navSpy.navigateByUrl).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by descending order ( done by store effect )', () => {
    // Create mock items
    const mockItems = createMockItems().sort((a, b) => a.price - b.price);

    // Mock action firing
    actions$ = hot('--a', {
      a: CompanyActions.sortItems({ items: mockItems, by: SortOptionsEnum.DESCENDING })
    });

    const expected = hot('--a', {
      a: CompanyActions.updateItems({ items: mockItems.reverse() })
    });

    expect(effects.sortItems$).toBeObservable(expected);
  });

  it('should sort by ascending order ( done by store effect )', () => {
    // Create mock items
    const mockItems: ItemModel[] = createMockItems().reverse();

    // Mock action firing
    actions$ = of(CompanyActions.sortItems({ items: mockItems, by: SortOptionsEnum.ASCENDING }));

    // Check if stream outputs correct next action with sorted items
    effects.sortItems$.subscribe(action => {
      expect(action).toEqual(CompanyActions.updateItems({ items: mockItems.reverse() }));
    });
  });

  it('should ensure search bar works', () => {
    component.items = createMockItems();
    component.itemLookup('A');
    expect(component.items.length).toEqual(50);
    expect(component.items[0].name).toEqual('name 0');
  });

  it('should check if inserting random characters breaks search', () => {
    component.items = createMockItems();
    component.itemLookup('£%$£%$£%^%$%34234324');
    // check no items
    expect(component.items.length).toBeFalsy();
    // reset items
    component.items = createMockItems();
    component.itemLookup('~ASDAS¬¬¬ASDASD%$^%$');
    // Check no items
    expect(component.items.length).toBeFalsy();

    // check if search function is broken
    // Reset items
    component.items = createMockItems();
    component.itemLookup('B');
    expect(component.items.length).toEqual(0);
  });

  it('should reset items based on store state', () => {
    const mockItems = createMockItems();

    // Set items in state
    mockStore.setState({
      ...mockEmptyState,
      company: {
        company: undefined,
        companyItems: mockItems,
        errorMessage: undefined,
        loading: false
      }
    });

    // Refresh state
    mockStore.refreshState();

    component.items = [];
    fixture.detectChanges();
    // This should set iitems in component to reflect state
    component.cancelLookup();
    fixture.detectChanges();
    mockStore.select('company')
             .pipe(take(1))
             .subscribe((state: fromCompany.State) => expect(state.companyItems).toBe(mockItems));
  });
});
