import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatRowHarness, MatTableHarness } from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoadingSpinnerService } from '../services/loading-spinner/loading-spinner.service';
import { UserModel } from '../shared/model/user.model';
import { SharedModule } from '../shared/shared.module';
import * as fromApp from './../reducers/index';
import { UserEffects } from './store/user.effects';
import * as fromUsers from './store/user.reducer';
import { UserComponent } from './user.component';
import * as UserActions from './store/user.actions';

describe('UserComponent', () => {
  const createMockUsers = (): UserModel[] => {
    const mockUsers: UserModel[] = [];

    for (let i = 0; i < 50; i++) {
      mockUsers.push(
        new UserModel(
          (Math.random() * 153000).toString(),
          `bla${i}@bla.com`,
          `longasspass${i}`,
          ['Admin', 'Rep'][Math.floor(Math.random() * 2)],
          'Company 1'));
    }

    return mockUsers;
  };

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let mockStore: MockStore<fromApp.State>;
  let mockUsersSelector: MemoizedSelector<fromUsers.State, UserModel[]>;
  let mockIsLoadingSelector: MemoizedSelector<fromUsers.State, boolean>;
  let effects: UserEffects;
  let actions$: Observable<Action>;

  const spinnerServiceSpy: jasmine.SpyObj<LoadingSpinnerService> = jasmine.createSpyObj(LoadingSpinnerService, ['observeNext']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        MatDialogHarness,
        {provide: LoadingSpinnerService, useValue: spinnerServiceSpy},
        provideMockStore({
          initialState: {
            user: {
              loading: false,
              focusedUser: null,
              users: []
            }
          } as fromApp.State
        }),
        provideMockActions(() => actions$),
        UserEffects,
      ],
      imports: [
        SharedModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject<UserEffects>(UserEffects);

    mockUsersSelector = mockStore.overrideSelector(
      fromUsers.selectUsers,
      []
    );

    mockIsLoadingSelector = mockStore.overrideSelector(
      fromUsers.selectIsLoading,
      false
    );

    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should begin loading when component initializes', async(() => {
    component.ngOnInit();
    actions$ = of(UserActions.beginLoadingUserPage());
    effects.beginLoadingPage$.subscribe(action => expect(action).toEqual(UserActions.loadAllUsers()));
  }));

  it('should present spinner when loading anything', async(() => {
    component.ngOnInit();
    mockIsLoadingSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    const progressBar = loader.getHarness(MatProgressBarHarness);
    expect(progressBar).toBeTruthy();
  }));

  it('should esure table displays rows', async () => {
    component.ngOnInit();
    mockUsersSelector.setResult(createMockUsers());

    mockStore.refreshState();
    fixture.detectChanges();

    const table: MatTableHarness = await loader.getHarness(MatTableHarness);
    const rows: MatRowHarness[] = await table.getRows();
    expect(rows.length).toEqual(5); // Expect 5 since paginator settings is set to 5
  });

  it('should filter according to predicate', async () => {

    // Define predicate to filter role, company and email
    component.filteringAction = (user: UserModel, filterValue: string) => {
      return user.email.toLowerCase().includes(filterValue)
        || user.role.toLowerCase().includes(filterValue)
        || user.companyId.toLowerCase().includes(filterValue);
    };

    component.ngOnInit();
    mockUsersSelector.setResult(createMockUsers());

    mockStore.refreshState();
    fixture.detectChanges();

    const filterInput = await loader.getHarness(MatInputHarness);
    await filterInput.setValue('bla0@bla.com');

    fixture.detectChanges();

    // Rows should be 1
    const table: MatTableHarness = await loader.getHarness(MatTableHarness);
    const rows: MatRowHarness[] = await table.getRows();
    const firstRow = await rows[0].host();
    const firstRowText = await firstRow.text();

    expect(rows.length).toEqual(1); // Expect 5 since paginator settings is set to 5
    expect(firstRowText.includes('bla0@bla.com')); // Expect 5 since paginator settings is set to 5
  });

  it('should show delete user dialog', async () => {
    component.ngOnInit();
    actions$ = of(UserActions.showDeleteUserDialog);
    effects.showDeleteUserDialog$.subscribe(); // no dispatch action

    fixture.detectChanges();

    const dialog: MatDialogHarness = await documentLoader.getHarness(MatDialogHarness);
    const dialogHost = await dialog.host();
    const dialogHostText = await dialogHost.text();

    expect(dialog).toBeTruthy();
    expect(dialogHostText.includes(environment.common.DELETE_DIALOG_CONFIRM_TEXT))
  });
});
