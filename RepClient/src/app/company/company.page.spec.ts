import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { SortOptions } from '../shared/model/sort-options';
import { mockEmptyState } from '../shared/test/empty-store-state.model';
import { CompanyPage } from './company.page';
import { ItemModel } from './model/item.model';
import * as CompanyActions from './store/company.actions';
import { CompanyEffects } from './store/company.effects';
import * as fromCompany from './store/company.reducer';
import * as fromApp from './../reducers/index';

const createMockItems = (): ItemModel[] => [
  new ItemModel('1', 'A', 'Mock item A', 1),
  new ItemModel('2', 'B', 'Mock item B', 2),
  new ItemModel('3', 'C', 'Mock item C', 3)
];

describe('CompanyPage', () => {
  let component: CompanyPage;
  let fixture: ComponentFixture<CompanyPage>;
  let actions$: Observable<Action>;
  let mockStore: MockStore<fromApp.AppState>;
  let effects: CompanyEffects;
  let testScheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        RouterTestingModule,
        CompanyEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: mockEmptyState
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyPage);
    component = fixture.componentInstance;

    testScheduler = new TestScheduler(((actual, expected) => {
      expect(actual).toEqual(expected);
    }));

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject<CompanyEffects>(CompanyEffects);
    mockStore.refreshState();

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by descending order ( done by store effect )', () => {
    // Create mock items
    const mockItems = createMockItems();

    // Mock action firing
    actions$ = of(CompanyActions.sortItems({items: mockItems, by: SortOptions.DESCENDING}));

    // Check if stream outputs correct next action with sorted items
    effects.sortItems$.subscribe(action => {
      expect(action).toEqual(CompanyActions.updateItems({items: mockItems.reverse()}));
    });
  });

  it('should sort by ascending order ( done by store effect )', () => {
    // Create mock items
    const mockItems: ItemModel[] = createMockItems().reverse();

    // Mock action firing
    actions$ = of(CompanyActions.sortItems({items: mockItems, by: SortOptions.ASCENDING}));

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
