import { Injectable } from '@angular/core';
import { CustomerModel } from './models/customers/customer.model';
import { Observable, of, pipe } from 'rxjs';
let CUSTOMERS;
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() {
  }

  newID(): number {
    return 1;
  }

  getCustomers(): Observable<CustomerModel[]> {
    return of(CUSTOMERS);
  }

  createCustomerRecord(customer: CustomerModel): Observable<any> {
    CUSTOMERS.push(customer);
    console.log(CUSTOMERS[CUSTOMERS.length - 1]);
    return of(CUSTOMERS[CUSTOMERS.length - 1]);
  }

  updateCustomerRecord(idOrName: any, column: string, newEntry: string): Observable<any> {
    let i = 0;
    while (i < CUSTOMERS.length) { // scan customer records
      if (idOrName === CUSTOMERS[i].id && CUSTOMERS[i].hasOwnProperty(column)) { // check if the id exists + column is correct
        CUSTOMERS[i][column] = newEntry; // select record by array position then change property base on column
        return of(CUSTOMERS[i]); // observable return here
      } else if (idOrName === CUSTOMERS[i].name && CUSTOMERS[i].hasOwnProperty(column)) {
        CUSTOMERS[i][column] = newEntry;
        return of(CUSTOMERS[i]);
      }
      i++;
    }
    console.log('Error, entry not found.');
  }

  deleteCustomerRecord(idOrName: any): Observable<any> {
    for (const cust of CUSTOMERS) { // scan customer records
      if (idOrName === CUSTOMERS[CUSTOMERS.indexOf(cust)].id) { // check if the id exists
        return of(CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1)); // delete entry, observable return
      } else if (idOrName === CUSTOMERS[CUSTOMERS.indexOf(cust)].name) {
        return of(CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1));
      }
    }
    console.log('Error, entry not found.');
  }
}
