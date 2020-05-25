import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { selectAllCustomers } from '../customers/store/customers.reducer';
import { selectAllProducts } from '../products/store/products.reducer';
import * as fromApp from '../reducers/index';
import { emptyState } from '../shared/empty.state';
import { TestModule } from '../shared/test/test.module';
import { selectRepUsers, selectUsers } from '../user/store/user.reducer';
import { OrdersComponent } from './orders.component';
import { selectAllOrders } from './store/order.reducer';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  let mockSelectAllOrders;
  let mockSelectAllCustomers;
  let mockSelectUsers;
  let mocksSelectAllProducts;
  let mockSelectRepUsers;

  let mockStore: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      providers: [
        provideMockStore<fromApp.State>({
          initialState: emptyState
        })
      ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        TestModule,
        MatDialogModule,
        LoggerTestingModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
    mockStore.refreshState();

    mockSelectAllOrders = mockStore.overrideSelector(selectAllOrders, []);
    mockSelectAllCustomers = mockStore.overrideSelector(selectAllCustomers, []);
    mockSelectUsers = mockStore.overrideSelector(selectUsers, []);
    mocksSelectAllProducts = mockStore.overrideSelector(selectAllProducts, []);
    mockSelectRepUsers = mockStore.overrideSelector(selectRepUsers, []);

  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
