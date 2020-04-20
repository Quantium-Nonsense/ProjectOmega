import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner/loading-spinner.service';
import { UserModel } from '../shared/model/user.model';
import { SharedModule } from '../shared/shared.module';
import * as fromApp from './../reducers/index';
import { UserEffects } from './store/user.effects';
import * as fromUsers from './store/user.reducer';
import { UserComponent } from './user.component';

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
  let effects: UserEffects;
  let actions$: Observable<Action>;

  let spinnerServiceSpy: jasmine.SpyObj<LoadingSpinnerService> = jasmine.createSpyObj(LoadingSpinnerService, ['observeNext']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
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

    mockUsersSelector = mockStore.overrideSelector(
      fromUsers.selectUsers,
      createMockUsers()
    );
    mockStore.refreshState();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
