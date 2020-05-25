import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { SupplierModel } from '../shared/model/home/supplier.model';
import { SharedModule } from '../shared/shared.module';
import { mockEmptyState } from '../shared/test/empty-store-state.model';
import * as fromApp from './../reducers/index';
import { HomePage } from './home.page';
import * as HomeActions from './store/home.actions';
import { HomeEffects } from './store/home.effects';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let mockStore: MockStore<fromApp.State>;
  let actions$: Observable<Action>;
  let effects: HomeEffects;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        SharedModule,
        IonicModule.forRoot()
      ],
      providers: [
        HomeEffects,
        provideMockStore(),
        provideMockActions(() => actions$)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // NgRx related
    mockStore = TestBed.inject(MockStore) as MockStore<fromApp.State>;
    effects = TestBed.inject(HomeEffects);

    // Set store state
    mockStore.setState(mockEmptyState);

    // Ensure store reflects new state
    mockStore.refreshState();
    // Force angular to pick up changes
    fixture.detectChanges();

  }));

  it('should begin loading when you hit dashboard', async(() => {
    const companies = createMockCompanies();
    spyOn(effects, 'getAllCompanies').and.returnValue(
        cold('--a|', {
          a: companies
        })
    );

    actions$ = hot('--a', {
      a: HomeActions.beginLoadingDashboard()
    }); // Mock dashboard first action

    const expected = hot('----(ab)', {
      a: HomeActions.showCompanies({ companies }),
      b: HomeActions.dashboardDoneLoading()
    });

    expect(effects.dashboardBeginLoading$).toBeObservable(expected);
  }));

  it('should create', () => {
    expect(component).toBeTruthy(); // Expect component to be created
  });

  it('should display loading companies', () => {
    // Current state companies are undefined thus loading elements should be there
    // Initialize component
    component.ionViewWillEnter();
    fixture.detectChanges(); // Check for changes

    // Ensure loading elements exist
    const loadingBuffer = fixture.debugElement.query(By.css('#loadingElements'));

    // ensure main content not displaying
    const mainContent = fixture.debugElement.query(By.css('#mainContent'));

    expect(loadingBuffer).toBeTruthy();
    expect(mainContent).toBeFalsy();
  });

  it('should display companies on dashboard', () => {

    const companies = createMockCompanies();
    component.ionViewWillEnter();
    // Set state with dummy companies
    mockStore.setState({
      ...mockEmptyState,
      home: {
        companies,
        loading: false,
        errorMessage: undefined
      }
    });

    // Ensure store reflects new state
    mockStore.refreshState();
    fixture.detectChanges();

    // Ensure loading elements are null
    const loadingBuffer = fixture.debugElement.query(By.css('#loadingElements'));

    // ensure main content is displaying
    const mainContent = fixture.debugElement.query(By.css('#mainContent'));

    expect(loadingBuffer).toBeFalsy();
    expect(mainContent).toBeTruthy();

  });

  it('should update state to clean', () => {
    // Create dummy companies
    const imageUrl = 'assets/shapes.svg';
    let companies: SupplierModel[] = [];
    companies = createMockCompanies();
    component.ionViewWillEnter();
    // Set state with dummy companies
    mockStore.setState({
      ...mockEmptyState,
      home: {
        errorMessage: undefined,
        companies,
        loading: false
      }
    });

    // Ensure store reflects new state
    mockStore.refreshState();
    fixture.detectChanges();

    // Reset state
    mockStore.setState({
      ...mockEmptyState,
      home: {
        errorMessage: undefined,
        companies: undefined,
        loading: false
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();
    //  loading elements
    const loadingBuffer = fixture.debugElement.query(By.css('#loadingElements'));

    // main content
    const mainContent = fixture.debugElement.query(By.css('#mainContent'));

    expect(loadingBuffer).toBeTruthy();
    expect(mainContent).toBeFalsy();
  })
  ;
});
