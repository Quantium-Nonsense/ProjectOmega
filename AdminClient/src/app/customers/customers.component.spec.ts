import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CustomersComponent } from './customers.component';
import {MatTableDataSource} from '@angular/material/table';
import {CustomerModel} from '../models/customers/customer.model';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [ CustomersComponent ],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a customer to a customer collection', () => {
    const customer = {id: 1, name: 'a', category: 'a', telephone: 'a', email: 'a',
      website: 'a', contact: 'a', address: 'a', townOrCity: 'a',
      county: 'a', country: 'a', postcode: 'a'};
    const customer2 = {id: 2, name: 'b', category: 'b', telephone: 'b', email: 'b',
      website: 'b', contact: 'b', address: 'b', townOrCity: 'b',
      county: 'b', country: 'b', postcode: 'b'};
    let customers: CustomerModel[] = [];
    customers.push(customer, customer2);
    component.customers = new MatTableDataSource(customers);
    expect(component.customers.data.length).toBe(2);
  });

  it('should load dialog data (dialog type)', () => {
    const inputData = 'load';
    component.data = inputData;
    expect(component.data).toBe('load');
  });

  it('should call the update record dialog once', () => {
    spyOn(component, 'openUpdateRecordDialog')
    component.openUpdateRecordDialog()
    expect(component.openUpdateRecordDialog).toHaveBeenCalledTimes(1)
  });
});
