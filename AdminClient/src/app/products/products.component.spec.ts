import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { Observable } from 'rxjs';
import * as fromApp from '../reducers/index';
import { emptyState } from '../shared/empty.state';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductsEffects } from './store/products.effects';
import { selectAllProducts } from './store/products.reducer';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockStore: MockStore;
  let mockSelectAllProducts;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore<fromApp.State>({
          initialState: emptyState
        }),
        ProductsEffects
      ],
      imports: [
        MatSnackBarModule,
        SharedModule,
        BrowserModule,
        NoopAnimationsModule,
        LoggerTestingModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
    mockSelectAllProducts = mockStore.overrideSelector(selectAllProducts, []);

  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
