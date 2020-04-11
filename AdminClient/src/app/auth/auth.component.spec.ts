import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '../reducers';
import { TestModule } from '../shared/test/test.module';
import { AuthComponent } from './auth.component';


describe('AuthPage', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore<AppState>;
  let mockRouter: jasmine.SpyObj<Router>;

  // Mocked services for auth page
  const mockSnackbar = jasmine.createSpyObj<MatSnackBar>(['open']);

  // mock definitions
  mockSnackbar.open.and.callThrough();

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj<Router>(['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [TestModule],
      providers: [
        AuthComponent,
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
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
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
        user: null,
        returnUrl: '',
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
        user: null,
        returnUrl: '',
      }
    });

    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.loadingSpinnerService.spin$.next).toHaveBeenCalled();
    });

  }));

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
      const compiled = fixture.debugElement.nativeElement;

      expect(component.emailHasError).toBe(true);
      expect(component.passwordHasError).toBe(true);
      expect(compiled.querySelector('#emailError').textContent).toContain('Not a valid email');
      expect(compiled.querySelector('#passwordError').textContent).toContain('Password is required');
    });
  }));

  it('should display errors if email is not entered and password is invalid', async(() => {
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const formElement = debugElement.query(By.css('form'));

    const emailInput: HTMLInputElement = formElement.query(By.css('#formEmailInput')).nativeElement;
    const passwordInput: HTMLInputElement = formElement.query(By.css('#formPasswordInput')).nativeElement;

    emailInput.textContent = '!';
    passwordInput.textContent = '1234';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;

      expect(component.emailHasError).toBe(true);
      expect(component.passwordHasError).toBe(true);
      expect(compiled.querySelector('#emailError').textContent).toContain('Email is required');
      expect(compiled.querySelector('#passwordError').textContent).toContain('Password should be at least 7 characters long');
    });
  }));

  it('should redirect me to the page I wanted to visit if I login successfully and have access', async(() => {
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const formElement = debugElement.query(By.css('form'));

    const emailInput: HTMLInputElement = formElement.query(By.css('#formEmailInput')).nativeElement;
    const passwordInput: HTMLInputElement = formElement.query(By.css('#formPasswordInput')).nativeElement;

    emailInput.textContent = 'test@example.com';
    passwordInput.textContent = 'password';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    mockStore.setState({
      auth: {
        errorMessage: 'Some Error message',
        loading: false,
        user: null,
        returnUrl: '/dashboard',
      }
    });

    // TODO will need to mock api call for this one
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;

      expect(component.emailHasError).toBe(false);
      expect(component.passwordHasError).toBe(false);
      expect(compiled.querySelector('#emailError')).toBeNull();
      expect(compiled.querySelector('#passwordError')).toBeNull();
    });

    fixture.debugElement.nativeElement.querySelector('#loginButton').click();

    fixture.whenStable().then(() => {
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

  }));

});
