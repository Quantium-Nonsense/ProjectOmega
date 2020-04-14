import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../shared.module';
import * as fromApp from '../../../reducers/index';
import * as fromOrder from '../../../order/store/order.reducer';

import { AddRemoveItemComponent } from './add-remove-item.component';

describe('AddRemoveItemComponent', () => {
  let component: AddRemoveItemComponent;
  let fixture: ComponentFixture<AddRemoveItemComponent>;
  let mockStore: MockStore<fromApp.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveItemComponent ],
      imports: [
        IonicModule.forRoot(),
        SharedModule
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRemoveItemComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    const mockItemsSelector = mockStore.overrideSelector(
      fromOrder.selectItems,
      []
    );

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
