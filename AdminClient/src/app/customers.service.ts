import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from './mock-customers';
import {Observable, of, pipe} from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  constructor() { }

  newID(): number {
    const hashId = uuidv4();
    return hashId;
  }

  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMERS)
  }

  createCustomerRecord(customer: Customer): Observable<any> {
    CUSTOMERS.push(customer);
    console.log('service check');
    console.log(CUSTOMERS[CUSTOMERS.length - 1])
    return of(CUSTOMERS[CUSTOMERS.length - 1]);
  }

  updateCustomerRecord(idOrName: any, column: string, newEntry: string): Observable<any> {
    let i = 0;
    if (idOrName.endsWith('*')) { // if *, search by id
      while (i < CUSTOMERS.length) { // scan customer records
        if (idOrName === CUSTOMERS[i].id && CUSTOMERS[i].hasOwnProperty(column)) { // check if the id exists + column is correct
          console.log('Property: ' + column + ' exists!')
          CUSTOMERS[i][column] = newEntry; // select record by array position then change property base on column
          return of(CUSTOMERS[i]); // observable return here
        }
        i++;
      }
      return null;
    }
    else {
      while (i < CUSTOMERS.length) { // scan customer records
        if (idOrName === CUSTOMERS[i].name && CUSTOMERS[i].hasOwnProperty(column)) { // check if the name exists + column is correct
          console.log('Property: ' + column + ' exists!')
          CUSTOMERS[i][column] = newEntry; // select record by array position then change property base on column
          return of(CUSTOMERS[i]); // observable return here
        }
        i++;
      }
      return null;
    }
  }

  deleteCustomerRecord(idOrName: any): Observable<any> {
    if (idOrName.endsWith('*')) { // if *, search by id
      const idTransformed = idOrName.replace('*',''); // remove * from string
      for (let cust of CUSTOMERS) { // scan customer records
        if (idTransformed === CUSTOMERS[CUSTOMERS.indexOf(cust)].id) { // check if the id exists
          return of(CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1)); // delete entry, observable return
        }
      }
      return null;
    }
    else {
      for (let cust of CUSTOMERS) { // scan customer records
        if (idOrName === CUSTOMERS[CUSTOMERS.indexOf(cust)].name) { // check if the name exists
          CUSTOMERS.splice(CUSTOMERS.indexOf(cust), 1); // delete entry
          return of(CUSTOMERS[CUSTOMERS.indexOf(cust)]); // observable return here
        }
      }
      return null;
    }
  }
}
