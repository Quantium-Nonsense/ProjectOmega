import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetHarness } from '@angular/material/bottom-sheet/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { ItemModel } from '../shared/model/company-items/item.model';
import { CompanyModel } from '../shared/model/home/company.model';
import { SortOptionsEnum } from '../shared/model/sort-options.enum';
import { SharedModule } from '../shared/shared.module';
import { mockEmptyState } from '../shared/test/empty-store-state.model';
import * as fromApp from './../reducers/index';
import { CompanyPage } from './company.page';
import * as CompanyActions from './store/company.actions';
import { CompanyEffects } from './store/company.effects';
import * as fromCompany from './store/company.reducer';
import Jasmine = jasmine.Jasmine;

const createMockItems = (): ItemModel[] => [
  new ItemModel('1', 'A', 'Mock item A', 1, 'Mock Company A'),
  new ItemModel('2', 'B', 'Mock item B', 2, 'Mock Company B'),
  new ItemModel('3', 'C', 'Mock item C', 3, 'Mock Company C')
];
const createMockCompanies = (): CompanyModel[] => [
  new CompanyModel('Company 1', 'A', 'Mock Company A'),
  new CompanyModel('Company 2', 'B', 'Mock Company B'),
  new CompanyModel('Company 3', 'C', 'Mock Company C')
];

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
        IonicModule.forRoot()
      ],
      providers: [
        {provide: Router, useValue: navSpy},
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
        action: (selectedCompany: string) => {
        },
        listLabels: [
          ...mockCompanies.map(c => c.name)
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

  it('should update the store with items of new company', async(() => {
    spyOn(effects, 'createFakeItems').and.callThrough().and.returnValue(createMockItems());

    actions$ = of(CompanyActions.loadItemsOfCompany({company: 'Company 1'}));

    effects.getItemsOfSelectedCompany$.subscribe(action => {
      expect(action).toEqual(CompanyActions.itemsOfCompanyLoaded({items: createMockItems()}));
    });
  }));

  it('should check when a company is selected redirect is triggered', () => {
    actions$ = of(CompanyActions.companySelected({selectedCompany: 'Company 1'}));

    effects.redirectToCompanyPage$.subscribe(); // trigger has no dispatch

    expect(navSpy.navigateByUrl).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by descending order ( done by store effect )', () => {
    // Create mock items
    const mockItems = createMockItems();

    // Mock action firing
    actions$ = of(CompanyActions.sortItems({items: mockItems, by: SortOptionsEnum.DESCENDING}));

    // Check if stream outputs correct next action with sorted items
    effects.sortItems$.subscribe(action => {
      expect(action).toEqual(CompanyActions.updateItems({items: mockItems.reverse()}));
    });
  });

  it('should sort by ascending order ( done by store effect )', () => {
    // Create mock items
    const mockItems: ItemModel[] = createMockItems().reverse();

    // Mock action firing
    actions$ = of(CompanyActions.sortItems({items: mockItems, by: SortOptionsEnum.ASCENDING}));

    // Check if stream outputs correct next action with sorted items
    effects.sortItems$.subscribe(action => {
      expect(action).toEqual(CompanyActions.updateItems({items: mockItems.reverse()}));
    });
  });

  it('should ensure search bar works', () => {
    component.items = createMockItems();
    component.itemLookup('A');
    expect(component.items.length).toEqual(1);
    expect(component.items[0].description).toEqual('Mock item A');
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
    expect(component.items.length).toEqual(1);
    expect(component.items[0].description).toEqual('Mock item B');
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
