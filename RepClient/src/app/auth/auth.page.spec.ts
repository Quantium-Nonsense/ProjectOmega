import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatError, MatSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if not logged in', async(() => {
    spyOn(component, 'showMessage');

    component.ngOnInit();
    component.ionViewWillEnter();

    mockStore.setState({
      auth: {
        errorMessage: 'Some Error message',
        loading: false,
        user: undefined
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showMessage).toHaveBeenCalled();
    });
  }));

  it('Should present loader when form submitted', async(() => {
    spyOn(component.loadingController, 'create') // Spy on function and ensure correct params are returned
      .and.callThrough()
      .and.returnValue(
      Promise.resolve({
        dismiss: () => {/*void*/
        },
        present: () => {/*void*/
        }
      }) as any
    ); // Spy on function service

    component.ngOnInit();
    component.ionViewWillEnter();

    mockStore.setState({
      auth: {
        errorMessage: undefined,
        loading: true,
        user: undefined
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loadingController.create).toHaveBeenCalled();
    });

  }));

  it('should display errors if inputs are invalid', async(() => {
    component.ngOnInit();
    component.ionViewWillEnter();

    const debugElement = fixture.debugElement;
    const formElement = debugElement.query(By.css('form'));

    const emailInput: HTMLInputElement = formElement.query(By.css('#formEmailInput')).nativeElement;
    const passwordInput: HTMLInputElement = formElement.query(By.css('#formPasswordInput')).nativeElement;

    emailInput.textContent = 'This is not a valid email obviously!';
    passwordInput.textContent = '';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.emailHasError).toBe(true);
      expect(component.passwordHasError).toBe(true);
    });
  }));
});
