import { Overlay } from '@angular/cdk/overlay';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import * as fromApp from '../reducers/index';
import { UserModel } from '../shared/model/auth/user.model';
import { TestModule } from '../shared/test/test.module';
import { AuthPage } from './auth.page';
import * as AuthActions from './store/auth.actions';
import { AuthEffects } from './store/auth.effects';
import * as fromAuth from './store/auth.reducer';

describe('AuthPage', () => {

  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;

  // Store related
  let mockStore: MockStore<fromApp.State>;
  let effects: AuthEffects;
  let actions$: Observable<Action>;
  // :Selectors
  let mockSelectIsLoading: MemoizedSelector<fromAuth.State, boolean>;
  let mockSelectUser: MemoizedSelector<fromAuth.State, UserModel>;
  let mockSelectErrorMessage: MemoizedSelector<fromAuth.State, string>;

  // Material component harness
  let documentLoader: HarnessLoader;
  let loader: HarnessLoader;

  // Providers
  const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj<Router>(['navigateByUrl']);
  const httpSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);

  const createMockUser = (): UserModel =>
      new UserModel(
          '1',
          'Dummy',
          'Test',
          'dummy@test.com',
          'password'
      );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [
        TestModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: HttpClient,
          useValue: httpSpy
        },
        {
          provide: JwtHelperService,
          useValue: jasmine.createSpyObj<JwtHelperService>('JwtHelperService', ['decodeToken'])
        },
        Overlay,
        MatSnackBarHarness,
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            auth: {}
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject(AuthEffects);

    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    loader = TestbedHarnessEnvironment.loader(fixture);

    // Override selectors
    mockSelectErrorMessage = mockStore.overrideSelector(fromAuth.selectErrorMessage, undefined);
    mockSelectIsLoading = mockStore.overrideSelector(fromAuth.selectIsLoading, false);
    mockSelectUser = mockStore.overrideSelector(fromAuth.selectUser, undefined);

    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message', async () => {
    component.ngOnInit();
    await component.ionViewWillEnter();
    mockSelectErrorMessage.setResult(environment.common.FAILED_LOGIN_SERVER);

    mockStore.refreshState();
    fixture.detectChanges();

    const snackBarHarness = await documentLoader.getHarness(MatSnackBarHarness);
    expect(snackBarHarness).toBeTruthy();
    const snackBarHost = await snackBarHarness.host();
    const snackBarText = await snackBarHost.text();
    expect(snackBarText.includes(environment.common.FAILED_LOGIN_SERVER)).toBe(true);
  });

  it('Should ensure log in successful', async(() => {
    component.ngOnInit();
    component.ionViewWillEnter();
    const mockUser = createMockUser();

    // Override functions in a way to indicate success
    spyOn(effects, 'attemptLogin').and.callThrough().and.returnValue(of({token: ''}));
    spyOn(effects, 'decodeToken').and.callThrough().and.returnValue(mockUser);

    actions$ = of(AuthActions.loginAttempt({email: mockUser.email, password: mockUser.password}));

    mockStore.refreshState();
    fixture.detectChanges();

    effects.loginAttempt$.subscribe((action: Action & { user: UserModel }) => {
      // Set up to fire success
      expect(action).toEqual(AuthActions.loginSuccessful({user: mockUser}));
    });

  }));

  it('Should handle failed log in', async(() => {
    component.ngOnInit();
    component.ionViewWillEnter();
    const mockUser = createMockUser();

    httpSpy.post.and.callThrough().and.returnValue(throwError(new HttpErrorResponse({
      error: 'mock error',
      status: 404
    })));

    actions$ = of(AuthActions.loginAttempt({email: mockUser.email, password: mockUser.password}));

    mockStore.refreshState();
    fixture.detectChanges();

    effects.loginAttempt$.subscribe((action: Action) => {
      // Set up to fire success
      expect(action).toEqual(AuthActions.loginRejected({errorMessage: environment.common.FAILED_LOGIN_SERVER}));
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

  it('should navigate to auth in case of rejected authentication', () => {

    actions$ = of(AuthActions.loginRejected({errorMessage: 'mock'}));
    effects.loginRejected$.subscribe();

    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });

  it('should show spinner', async () => {
    // todo: in the future we want to wrap the spinner in a component that when loading is true attaches this
    spyOn(effects, 'presentSpinner').and.callThrough();

    actions$ = of(AuthActions.showSpinner());
    effects.showSpinner$.subscribe();
    fixture.detectChanges();

    expect(effects.presentSpinner).toHaveBeenCalled();
  });

  it('should redirect home on successful Login', () => {
    actions$ = of(AuthActions.loginSuccessful({user: createMockUser()}));

    effects.successfulLogin$.subscribe();
    expect(mockRouter.navigateByUrl).toHaveBeenCalled();
  });
});
