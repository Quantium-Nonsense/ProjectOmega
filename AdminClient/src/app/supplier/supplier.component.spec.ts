import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SupplierComponent } from './supplier.component';

describe('ClientsComponent', () => {
  let component: SupplierComponent;
  let fixture: ComponentFixture<SupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [SupplierComponent],
             providers: [
               provideMockStore({
                 initialState: {
                   suppliers: {}
                 }
               })
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
