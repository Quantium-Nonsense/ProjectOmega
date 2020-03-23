import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './mock-customers';
import {Observable, of, pipe} from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMERS)
  }

  updateCustomerRecord(id: number, column: string, newEntry: string): Observable<any> {
    let i = 0;
    while (i < CUSTOMERS.length) { // scan customer records
      console.log(CUSTOMERS[i]);
      console.log('Stage 1');
      if (id === CUSTOMERS[i].id && CUSTOMERS[i].hasOwnProperty(column)) { // check if the id exists + column is correct
        console.log('Stage 2');
        console.log('Property: ' + column + ' exists! :)')
        CUSTOMERS[i][column] = newEntry; // select record by ID then change property base on column
          return of(CUSTOMERS[i]); // observable return here
      }
      i++;
    }
    return null;
  }
}
