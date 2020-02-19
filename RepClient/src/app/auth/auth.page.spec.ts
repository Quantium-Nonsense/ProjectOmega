import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { LoadingController, MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TestModule } from '../shared/test/test.module';

import { AuthPage } from './auth.page';
import { AuthState } from './store/auth.reducer';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let mockStore: MockStore<AuthState>;

  // Mocked services for auth page
  const mockMenuController = jasmine.createSpyObj<MenuController>(['enable']);
  const mockSnackbar = jasmine.createSpyObj<MatSnackBar>(['open']);
  const mockLoadingController = jasmine.createSpyObj<LoadingController>(['create', 'dismiss']);



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [TestModule],
      providers: [
        provideMockStore(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
