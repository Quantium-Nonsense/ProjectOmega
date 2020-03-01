import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatError } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../reducers';
import { TestModule } from '../shared/test/test.module';
import { AuthPage } from './auth.page';


describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let mockStore: MockStore<AppState>;

  // Mocked services for auth page
  const mockMenuController = jasmine.createSpyObj<MenuController>(['enable']);
  const mockSnackbar = jasmine.createSpyObj<MatSnackBar>(['open']);

  // mock definitions
  mockSnackbar.open.and.callThrough();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [TestModule],
      providers: [
        provideMockStore(),
        {provide: MatSnackBar, useValue: mockSnackbar},
        {
          provide: LoadingController, useValue: {
            create: () => Promise.resolve({
              dismiss: () => {/*void*/
              },
              present: () => {/*void*/
              }
            }),
            dismiss: () => Promise.resolve()
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    mockStore.setState({
      auth: {
        errorMessage: undefined,
        loading: false,
        user: undefined
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
