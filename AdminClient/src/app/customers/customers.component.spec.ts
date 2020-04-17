import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersComponent]
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

  it('should contain column text in the table',() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#table').textContent).toContain('ID' && 'Name' && 'Category'
    && 'Telephone' && 'Email' && 'Website' && 'Cont' && 'Address' && 'Town/City' && 'County' && 'Country' &&
      'Postcode');
  });


  it('should add a customer to a customer collection', () => {
    component.customers = [];
    let customer = {id: 1, name: 'a', category: 'a', telephone: 'a', email: 'a',
        website: 'a', contact: 'a', address: 'a', townOrCity: 'a',
        county: 'a', country: 'a', postcode: 'a'};
    component.customers.push(customer);
    customer = {id: 2, name: 'b', category: 'b', telephone: 'b', email: 'b',
        website: 'b', contact: 'b', address: 'b', townOrCity: 'b',
        county: 'b', country: 'b', postcode: 'b'};
    component.customers.push(customer);
    expect(component.customers.length).toBe(2);
  });

  it('should remove a customer from a customer collection', () => {
    component.customers = [{id: 1, name: 'a', category: 'a', telephone: 'a', email: 'a',
      website: 'a', contact: 'a', address: 'a', townOrCity: 'a',
      county: 'a', country: 'a', postcode: 'a'}];
    component.customers.pop();
    expect(component.customers.length).toBe(0);
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
