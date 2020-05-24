import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRowHarness, MatTableHarness } from '@angular/material/table/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as fromApp from '../reducers/index';
import { emptyState } from '../shared/empty.state';
import { RoleModel } from '../shared/model/role/role.model';
import { UserModel } from '../shared/model/user/user.model';
import { SharedModule } from '../shared/shared.module';
import * as UserActions from './store/user.actions';
import { UserEffects } from './store/user.effects';
import * as fromUsers from './store/user.reducer';
import { selectRoles } from './store/user.reducer';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  const createMockUsers = (): UserModel[] => {
    const mockUsers: UserModel[] = [];
    const mockRoles: RoleModel[] = [
      {
        id: 27,
        privileges: [
          {
            id: 1,
            name: 'CREATE_ROLE_PRIVILEGE'
          },
          {
            id: 4,
            name: 'DELETE_ROLE_PRIVILEGE'
          },
          {
            id: 2,
            name: 'READ_ROLE_PRIVILEGE'
          },
          {
            id: 3,
            name: 'UPDATE_ROLE_PRIVILEGE'
          },
          {
            id: 5,
            name: 'CREATE_USER_PRIVILEGE'
          },
          {
            id: 8,
            name: 'DELETE_USER_PRIVILEGE'
          },
          {
            id: 6,
            name: 'READ_USER_PRIVILEGE'
          },
          {
            id: 7,
            name: 'UPDATE_USER_PRIVILEGE'
          },
          {
            id: 9,
            name: 'CREATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 12,
            name: 'DELETE_PRODUCT_PRIVILEGE'
          },
          {
            id: 10,
            name: 'READ_PRODUCT_PRIVILEGE'
          },
          {
            id: 11,
            name: 'UPDATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 13,
            name: 'CREATE_ORDER_PRIVILEGE'
          },
          {
            id: 16,
            name: 'DELETE_ORDER_PRIVILEGE'
          },
          {
            id: 14,
            name: 'READ_ORDER_PRIVILEGE'
          },
          {
            id: 15,
            name: 'UPDATE_ORDER_PRIVILEGE'
          },
          {
            id: 17,
            name: 'CREATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 20,
            name: 'DELETE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 18,
            name: 'READ_SUPPLIER_PRIVILEGE'
          },
          {
            id: 19,
            name: 'UPDATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 25,
            name: 'ASSIGN_CLIENT_PRIVILEGE'
          },
          {
            id: 21,
            name: 'CREATE_CLIENT_PRIVILEGE'
          },
          {
            id: 24,
            name: 'DELETE_CLIENT_PRIVILEGE'
          },
          {
            id: 22,
            name: 'READ_CLIENT_PRIVILEGE'
          },
          {
            id: 23,
            name: 'UPDATE_CLIENT_PRIVILEGE'
          },
          {
            id: 26,
            name: 'ASSIGN_PRIVILEGE_PRIVILEGE'
          }
        ],
        name: 'ROLE_SUPER_ADMIN'
      },
      {
        id: 28,
        privileges: [
          {
            id: 1,
            name: 'CREATE_ROLE_PRIVILEGE'
          },
          {
            id: 4,
            name: 'DELETE_ROLE_PRIVILEGE'
          },
          {
            id: 2,
            name: 'READ_ROLE_PRIVILEGE'
          },
          {
            id: 3,
            name: 'UPDATE_ROLE_PRIVILEGE'
          },
          {
            id: 5,
            name: 'CREATE_USER_PRIVILEGE'
          },
          {
            id: 8,
            name: 'DELETE_USER_PRIVILEGE'
          },
          {
            id: 6,
            name: 'READ_USER_PRIVILEGE'
          },
          {
            id: 7,
            name: 'UPDATE_USER_PRIVILEGE'
          },
          {
            id: 9,
            name: 'CREATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 12,
            name: 'DELETE_PRODUCT_PRIVILEGE'
          },
          {
            id: 10,
            name: 'READ_PRODUCT_PRIVILEGE'
          },
          {
            id: 11,
            name: 'UPDATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 13,
            name: 'CREATE_ORDER_PRIVILEGE'
          },
          {
            id: 16,
            name: 'DELETE_ORDER_PRIVILEGE'
          },
          {
            id: 14,
            name: 'READ_ORDER_PRIVILEGE'
          },
          {
            id: 15,
            name: 'UPDATE_ORDER_PRIVILEGE'
          },
          {
            id: 17,
            name: 'CREATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 20,
            name: 'DELETE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 18,
            name: 'READ_SUPPLIER_PRIVILEGE'
          },
          {
            id: 19,
            name: 'UPDATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 25,
            name: 'ASSIGN_CLIENT_PRIVILEGE'
          },
          {
            id: 21,
            name: 'CREATE_CLIENT_PRIVILEGE'
          },
          {
            id: 24,
            name: 'DELETE_CLIENT_PRIVILEGE'
          },
          {
            id: 22,
            name: 'READ_CLIENT_PRIVILEGE'
          },
          {
            id: 23,
            name: 'UPDATE_CLIENT_PRIVILEGE'
          },
          {
            id: 26,
            name: 'ASSIGN_PRIVILEGE_PRIVILEGE'
          }
        ],
        name: 'ROLE_DEFAULT_USER'
      },
      {
        id: 29,
        privileges: [
          {
            id: 1,
            name: 'CREATE_ROLE_PRIVILEGE'
          },
          {
            id: 4,
            name: 'DELETE_ROLE_PRIVILEGE'
          },
          {
            id: 2,
            name: 'READ_ROLE_PRIVILEGE'
          },
          {
            id: 3,
            name: 'UPDATE_ROLE_PRIVILEGE'
          },
          {
            id: 5,
            name: 'CREATE_USER_PRIVILEGE'
          },
          {
            id: 8,
            name: 'DELETE_USER_PRIVILEGE'
          },
          {
            id: 6,
            name: 'READ_USER_PRIVILEGE'
          },
          {
            id: 7,
            name: 'UPDATE_USER_PRIVILEGE'
          },
          {
            id: 9,
            name: 'CREATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 12,
            name: 'DELETE_PRODUCT_PRIVILEGE'
          },
          {
            id: 10,
            name: 'READ_PRODUCT_PRIVILEGE'
          },
          {
            id: 11,
            name: 'UPDATE_PRODUCT_PRIVILEGE'
          },
          {
            id: 13,
            name: 'CREATE_ORDER_PRIVILEGE'
          },
          {
            id: 16,
            name: 'DELETE_ORDER_PRIVILEGE'
          },
          {
            id: 14,
            name: 'READ_ORDER_PRIVILEGE'
          },
          {
            id: 15,
            name: 'UPDATE_ORDER_PRIVILEGE'
          },
          {
            id: 17,
            name: 'CREATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 20,
            name: 'DELETE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 18,
            name: 'READ_SUPPLIER_PRIVILEGE'
          },
          {
            id: 19,
            name: 'UPDATE_SUPPLIER_PRIVILEGE'
          },
          {
            id: 25,
            name: 'ASSIGN_CLIENT_PRIVILEGE'
          },
          {
            id: 21,
            name: 'CREATE_CLIENT_PRIVILEGE'
          },
          {
            id: 24,
            name: 'DELETE_CLIENT_PRIVILEGE'
          },
          {
            id: 22,
            name: 'READ_CLIENT_PRIVILEGE'
          },
          {
            id: 23,
            name: 'UPDATE_CLIENT_PRIVILEGE'
          },
          {
            id: 26,
            name: 'ASSIGN_PRIVILEGE_PRIVILEGE'
          }
        ],
        name: 'ROLE_ADMIN'
      },
      {
        id: 30,
        privileges: [
          {
            id: 6,
            name: 'READ_USER_PRIVILEGE'
          },
          {
            id: 10,
            name: 'READ_PRODUCT_PRIVILEGE'
          },
          {
            id: 13,
            name: 'CREATE_ORDER_PRIVILEGE'
          },
          {
            id: 16,
            name: 'DELETE_ORDER_PRIVILEGE'
          },
          {
            id: 14,
            name: 'READ_ORDER_PRIVILEGE'
          },
          {
            id: 15,
            name: 'UPDATE_ORDER_PRIVILEGE'
          },
          {
            id: 18,
            name: 'READ_SUPPLIER_PRIVILEGE'
          },
          {
            id: 22,
            name: 'READ_CLIENT_PRIVILEGE'
          },
          {
            id: 23,
            name: 'UPDATE_CLIENT_PRIVILEGE'
          }
        ],
        name: 'ROLE_REP'
      }
    ];
    for (let i = 0; i < 50; i++) {
      mockUsers.push(
          new UserModel(
              i,
              `bla${ i }@bla.com`,
              `longasspass${ i }`,
              [mockRoles[Math.floor(Math.random() * mockRoles.length)]]
          ));
    }

    return mockUsers;
  };

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let mockStore: MockStore;
  let mockUsersSelector: MemoizedSelector<fromUsers.State, UserModel[]>;
  let mockIsLoadingSelector: MemoizedSelector<fromUsers.State, boolean>;
  let mockUserSelector: MemoizedSelector<fromUsers.State, UserModel>;
  let mockSelectRoles;
  let effects: UserEffects;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [UserComponent],
             providers: [
               FormBuilder,
               MatDialogHarness,
               provideMockStore<fromApp.State>({
                 initialState: emptyState
               }),
               provideMockActions(() => actions$),
               UserEffects
             ],
             imports: [
               NoopAnimationsModule,
               MatSnackBarModule,
               SharedModule
             ]
           })
           .compileComponents();
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject<UserEffects>(UserEffects);

    mockUsersSelector = mockStore.overrideSelector(fromUsers.selectUsers, []);
    mockSelectRoles = mockStore.overrideSelector(selectRoles, []);

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
             || user.roles.some(r => r.name.toLowerCase().includes(filterValue));
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
    // todo: Test
  }));

  it('should delete user', async(() => {
    // todo: Test
  }));
  it('should delete 5 users', async(() => {
    // todo: Test
  }));
});
