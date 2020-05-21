import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatRowHarness, MatTableHarness } from '@angular/material/table/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../shared/model/user/user.model';
import { TestModule } from '../shared/test/test.module';
import * as fromApp from './../reducers/index';
import * as UserActions from './store/user.actions';
import { UserEffects } from './store/user.effects';
import * as fromUsers from './store/user.reducer';
import { selectFocusedUser, selectUsers } from './store/user.reducer';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  const createMockUsers = (): UserModel[] => {
    const mockUsers: UserModel[] = [];

    for (let i = 0; i < 50; i++) {
      mockUsers.push(
          new UserModel(
              (i).toString(),
              `bla${ i }@bla.com`,
              `longasspass${ i }`,
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
  let mockUserSelector: MemoizedSelector<fromUsers.State, UserModel>;
  let effects: UserEffects;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [UserComponent],
             providers: [
               MatDialogHarness,
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
               UserEffects
             ],
             imports: [
               TestModule
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

    mockUserSelector = mockStore.overrideSelector(
        fromUsers.selectFocusedUser,
        createMockUsers()[5]
    );

    mockStore.refreshState();
    fixture.detectChanges();
  }));

  afterEach(async () => {
    try {
      const matDialog = await documentLoader.getHarness(MatDialogHarness);
      if (matDialog) {
        await matDialog.close();
      }
    } catch (e) {
      // ignore means no dialog is up
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should begin loading when component initializes', async () => {
    component.ngOnInit();
    actions$ = of(UserActions.getAllUsers());
    effects.beginLoadingPage$.subscribe(action => expect(action).toEqual(UserActions.loadAllUsers()));
  });

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
    expect(dialogHostText.includes(environment.common.DELETE_USER_CONFIRM_TEXT));
  });

  it('should show edit user modal', async () => {
    component.ngOnInit();
    actions$ = of(UserActions.showEditUserModal);
    effects.showEditUserModal$.subscribe(); // no dispatch

    fixture.detectChanges();

    const dialog: MatDialogHarness = await documentLoader.getHarness(MatDialogHarness);
    expect(dialog).toBeTruthy();
  });

  it('should edit user', async(() => {
    component.ngOnInit();
    const mockUsers = createMockUsers();
    selectUsers.setResult(mockUsers);
    mockStore.refreshState();

    actions$ = of(UserActions.editUser({
      user: {
        ...mockUsers[5],
        email: 'changed@email.com',
        companyId: 'Company 1'
      }
    }));

    effects.editUser$.subscribe(action => {
      expect(action.newUsers[5].email).toEqual('changed@email.com');
    });

  }));

  it('should delete user', async(() => {
    component.ngOnInit();
    const mockUsers = createMockUsers();
    selectUsers.setResult(mockUsers);
    selectFocusedUser.setResult(mockUsers[5]);
    mockStore.refreshState();

    actions$ = of(UserActions.deleteUser());

    effects.deleteUser$.subscribe(action => {
      const tryToFindDeletedUser = action.newUserList.find(u => u.id === mockUsers[5].id);
      expect(tryToFindDeletedUser).toBeFalsy();
    });

  }));
  it('should delete 5 users', async(() => {
    component.ngOnInit();
    const mockUsers = createMockUsers();
    selectUsers.setResult(mockUsers);

    for (let i = 0; i < 5; i++) {
      selectFocusedUser.setResult(mockUsers[i]);
      mockStore.refreshState();

      actions$ = of(UserActions.deleteUser());

      effects.deleteUser$.subscribe(action => {
        const tryToFindDeletedUser = action.newUserList.find(u => u.id === mockUsers[i].id);
        expect(tryToFindDeletedUser).toBeFalsy();
      });

    }
  }));
});
