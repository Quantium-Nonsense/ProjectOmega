import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { routes } from '../app-routing.module';
import { emptyState } from '../shared/empty.state';
import { TestModule } from '../shared/test/test.module';
import { AuthComponent } from './auth.component';
import * as fromApp from '../reducers/index';

describe('AuthPage', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore;
  let mockRouter: Router;

  // Mocked services for auth page
  const mockSnackbar = jasmine.createSpyObj<MatSnackBar>(['open']);

  // mock definitions
  mockSnackbar.open.and.callThrough();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [TestModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        AuthComponent,
        provideMockStore<fromApp.State>({
          initialState: emptyState
        }),
        { provide: MatSnackBar, useValue: mockSnackbar }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockRouter = TestBed.inject(Router);
    mockStore.refreshState();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure form has no string errors', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.authForm.get('password').setValue('123');
    component.authForm.get('email').setValue('ivnalidemail');
    fixture.detectChanges();

    expect(component.passwordHasError && component.emailHasError).toBe(true); // Ensure there are errors

    component.authForm.get('password').setValue('alongvalidpassword');
    component.authForm.get('email').setValue('valid@email.com');

    expect(component.passwordErrorMessage).toBeFalsy();
    expect(component.emailErrorMessage).toBeFalsy();
  });

  it('should check min length error', async(() => {
    component.ngOnInit();
    fixture.detectChanges();

    component.authForm.get('password').setValue('123');
    fixture.detectChanges();

    expect(component.authForm.get('password').hasError('minlength')).toBe(true);
  }));

  it('should show error message if not logged in', async(() => {
    spyOn(component, 'showMessage');

    component.ngOnInit();

    mockStore.setState({
      toolbar: null,
      auth: {
        errorMessage: 'Some Error message',
        loading: false,
        user: null,
        returnUrl: ''
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showMessage).toHaveBeenCalled();
    });
  }));

  it('should create form on initialization', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.authForm).toBeTruthy();
  });

  it('should display errors if email is invalid and password not entered', async(() => {
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

  it('should display errors if email is not entered and password is invalid', async(() => {
    component.ngOnInit();
    const debugElement = fixture.debugElement;
    const formElement = debugElement.query(By.css('form'));

    const emailInput: HTMLInputElement = formElement.query(By.css('#formEmailInput')).nativeElement;
    const passwordInput: HTMLInputElement = formElement.query(By.css('#formPasswordInput')).nativeElement;

    emailInput.textContent = '';
    passwordInput.textContent = '1234';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.emailHasError).toBe(true);
      expect(component.passwordHasError).toBe(true);
    });
  }));
});
