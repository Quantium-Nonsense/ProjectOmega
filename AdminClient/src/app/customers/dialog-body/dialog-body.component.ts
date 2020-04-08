import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../../customer';
import {CUSTOMERS} from "../../mock-customers";
import {CustomersService} from '../../customers.service';
import {CustomersComponent} from '../customers.component';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  dialogForm = new FormGroup({
    dialogControl1: new FormControl(''),
    dialogControl2: new FormControl(''),
    dialogControl3: new FormControl(''),
    dialogControl4: new FormControl(''),
    dialogControl5: new FormControl(''),
    dialogControl6: new FormControl(''),
    dialogControl7: new FormControl(''),
    dialogControl8: new FormControl(''),
    dialogControl9: new FormControl(''),
    dialogControl10: new FormControl(''),
    dialogControl11: new FormControl('')
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
    console.log('Form Submitted!');
    console.warn(this.dialogForm.value);

      if (this.data === 'create') { // create customer
        console.log('Checkpoint 1');
        const customer: Customer =
          {
            id: this.customerService.newID(),
            name: this.dialogForm.get('dialogControl1').value.toString(),
            category: this.dialogForm.get('dialogControl2').value.toString(),
            telephone: this.dialogForm.get('dialogControl3').value,
            email: this.dialogForm.get('dialogControl4').value.toString(),
            website: this.dialogForm.get('dialogControl5').value.toString(),
            contact: this.dialogForm.get('dialogControl6').value.toString(),
            address: this.dialogForm.get('dialogControl7').value.toString(),
            townOrCity: this.dialogForm.get('dialogControl8').value.toString(),
            county: this.dialogForm.get('dialogControl9').value.toString(),
            country: this.dialogForm.get('dialogControl10').value.toString(),
            postcode: this.dialogForm.get('dialogControl11').value.toString()
          };
        this.customerService.createCustomerRecord(customer)
          .subscribe();
      }

      if (this.data === 'update') { // update customer
        this.customerService.updateCustomerRecord(this.dialogForm.get('dialogControl1').value.toString(),
          this.dialogForm.get('dialogControl2').value.toString(),
          this.dialogForm.get('dialogControl3').value.toString())
          .subscribe();
      }

      if (this.data === 'delete') { // update customer
        this.customerService.deleteCustomerRecord(this.dialogForm.get('dialogControl1').value.toString())
          .subscribe();
      }
    }
  }
}
