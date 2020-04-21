import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomerModel} from '../../models/customers/customer.model';
import {CUSTOMERS} from '../../mock-customers';
import {CustomersService} from '../../customers.service';
import {CustomersComponent} from '../customers.component';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  dialogForm = new FormGroup({
    dialogName: new FormControl(''),
    dialogCategory: new FormControl(''),
    dialogTelephone: new FormControl(''),
    dialogEmail: new FormControl(''),
    dialogWebsite: new FormControl(''),
    dialogContact: new FormControl(''),
    dialogAddress: new FormControl(''),
    dialogTownOrCity: new FormControl(''),
    dialogCounty: new FormControl(''),
    dialogCountry: new FormControl(''),
    dialogPostcode: new FormControl('')
  });

  @Input() data; // dialog selected

  constructor(private customerService: CustomersService) {

  }

  ngOnInit() {
  }

  // Closes the dialog
  close() {
    this.data = 'none';
  }

  // Check dialog that is displayed with data string (load, create etc.)
  displayLoad(): boolean {
    return this.data === 'load';
  }

  displayCreate(): boolean {
    return this.data === 'create';
  }

  displayUpdate(): boolean {
    return this.data === 'update';
  }

  displayDelete(): boolean {
    return this.data === 'delete';
  }

  // Post-submission button event
  submit() {
    if (this.dialogForm.valid) {
    console.warn(this.dialogForm.value);

      if (this.data === 'create') { // create customer
        const customer: CustomerModel =
          {
            id: this.customerService.newID(),
            name: this.dialogForm.get('dialogName').value.toString(),
            category: this.dialogForm.get('dialogCategory').value.toString(),
            telephone: this.dialogForm.get('dialogTelephone').value,
            email: this.dialogForm.get('dialogEmail').value.toString(),
            website: this.dialogForm.get('dialogWebsite').value.toString(),
            contact: this.dialogForm.get('dialogContact').value.toString(),
            address: this.dialogForm.get('dialogAddress').value.toString(),
            townOrCity: this.dialogForm.get('dialogTownOrCity').value.toString(),
            county: this.dialogForm.get('dialogCounty').value.toString(),
            country: this.dialogForm.get('dialogCountry').value.toString(),
            postcode: this.dialogForm.get('dialogPostcode').value.toString()
          };
        this.customerService.createCustomerRecord(customer)
          .subscribe();
      }

      if (this.data === 'update') { // update customer - form controls are reused here
        this.customerService.updateCustomerRecord(this.dialogForm.get('dialogName').value,
          this.dialogForm.get('dialogCategory').value,
          this.dialogForm.get('dialogTelephone').value)
          .subscribe();
      }

      if (this.data === 'delete') { // delete customer - form controls are reused here
        this.customerService.deleteCustomerRecord(this.dialogForm.get('dialogName').value.toString())
          .subscribe();
      }
    }
  }
}
