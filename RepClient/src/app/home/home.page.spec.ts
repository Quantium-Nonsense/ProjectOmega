import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule, IonSpinner } from '@ionic/angular';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { take } from 'rxjs/operators';
import { CompanyModel } from '../models/home/company.model';
import { ListLoaderComponent } from '../shared/component/list-loader/list-loader.component';
import { SharedModule } from '../shared/shared.module';
import * as fromApp from './../reducers/index';
import { HomePage } from './home.page';
import * as HomeActions from './store/home.actions';
import * as fromHome from './store/home.reducer';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockStore: MockStore<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        SharedModule,
        IonicModule.forRoot()
      ],
      providers: [
        provideMockStore()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore<fromApp.AppState>;

    // Set store state
    mockStore.setState({
      auth: undefined,
      company: undefined,
      home: {
        companies: undefined,
        loading: true
      }
    });

    // Ensure store reflects new state
    mockStore.refreshState();
    // Force angular to pick up changes
    fixture.detectChanges();

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

    // Create dummy companies
    const imageUrl = 'assets/shapes.svg';
    const companies: CompanyModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new CompanyModel(`Company ${i}`, imageUrl, `Some fantastic company called ${i}!`));
    }

    component.ionViewWillEnter();
    // Set state with dummy companies
    mockStore.setState({
      auth: undefined,
      company: undefined,
      home: {
        companies,
        loading: false
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
    const companies: CompanyModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new CompanyModel(`Company ${i}`, imageUrl, `Some fantastic company called ${i}!`));
    }

    component.ionViewWillEnter();
    // Set state with dummy companies
    mockStore.setState({
      auth: undefined,
      company: undefined,
      home: {
        companies,
        loading: false
      }
    });

    // Ensure store reflects new state
    mockStore.refreshState();
    fixture.detectChanges();

    // Reset state
    mockStore.setState({
      auth: undefined,
      company: undefined,
      home: {
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
  });
});
