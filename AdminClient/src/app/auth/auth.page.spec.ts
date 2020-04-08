import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../reducers';
import { TestModule } from '../shared/test/test.module';
import { AuthPage } from './auth.page';


describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let mockStore: MockStore<AppState>;

  // Mocked services for auth page
  const mockSnackbar = jasmine.createSpyObj<MatSnackBar>(['open']);

  // mock definitions
  mockSnackbar.open.and.callThrough();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [TestModule],
      providers: [
        AuthPage,
        provideMockStore({
          initialState: {
            auth: {
              errorMessage: null,
              loading: false,
              user: null
            }
          }
        }),
        {provide: MatSnackBar, useValue: mockSnackbar},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if not logged in', async(() => {
    spyOn(component, 'showMessage');

    component.ngOnInit();

    mockStore.setState({
      auth: {
        errorMessage: 'Some Error message',
        loading: false,
        user: null
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showMessage).toHaveBeenCalled();
    });
  }));

  it('Should present loader when form submitted', async(() => {
    spyOn(component.loadingSpinnerService.spin$, 'next'); // Spy on function

    component.ngOnInit();

    mockStore.setState({
      auth: {
        errorMessage: null,
        loading: true,
        user: null
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loadingSpinnerService.spin$.next).toHaveBeenCalled();
    });

  }));

  it('should display errors if inputs are invalid', async(() => {
    component.ngOnInit();

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
