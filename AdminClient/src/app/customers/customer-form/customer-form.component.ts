import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CustomerModel } from '../../models/customers/customer.model';
import * as fromApp from '../../reducers/index';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import { selectIsToolbarVisible } from '../../toolbar/store/toolbar.reducer';
import * as CustomerActions from '../store/customers.actions';

@Component({
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, OnDestroy {
	customerForm: FormGroup;
	isLoading: boolean;

	private sub: Subscription;

	constructor(
			private store$: Store<fromApp.State>,
			private dialogRef: MatDialogRef<CustomerFormComponent>,
			@Inject(MAT_DIALOG_DATA) public data: { customer: CustomerModel }
	) {
		this.sub = new Subscription();
		this.customerForm = this.initializeForm();
	}

	ngOnInit(): void {
		this.sub.add(
				this.store$.pipe(select(selectIsToolbarVisible))
					.subscribe(isLoading => {
						this.isLoading = isLoading;
						if (isLoading) {
							this.customerForm.disable();
						} else {
							this.customerForm.enable();
						}
					})
		);
		const customer = this.data.customer;
		if (customer) {
			this.companyName.setValue(customer.companyName);
			this.contactNumber.setValue(customer.contactNumber);
			this.description.setValue(customer.description);
			this.email.setValue(customer.email);
			this.firstName.setValue(customer.firstName);
			this.lastName.setValue(customer.lastName);
			this.notes.setValue(customer.notes);
		}
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	initializeForm = (): FormGroup => {
		return new FormGroup({
			companyName: new FormControl('', [Validators.required]),
			contactNumber: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			notes: new FormControl('')
		});
	};

	get lastNameHasError(): boolean {
		return this.lastName.invalid;
	}

	get lastNameErrorMessage(): string {
		return this.lastName.hasError('required') ? 'Last name is required' : null;
	}

	get firstNameHasError(): boolean {
		return this.firstName.invalid;
	}

	get firstNameErrorMessage(): string {
		return this.firstName.hasError('required') ? 'First name is required' : null;
	}

	get descriptionHasError(): boolean {
		return this.description.invalid;
	}

	get descriptionErrorMessage(): string {
		return this.description.hasError('required') ? 'Description is required' : null;
	}

	get companyName(): AbstractControl {
		return this.customerForm.get('companyName');
	}

	get contactNumber(): AbstractControl {
		return this.customerForm.get('contactNumber');
	}

	get description(): AbstractControl {
		return this.customerForm.get('description');
	}

	get email(): AbstractControl {
		return this.customerForm.get('email');
	}

	get firstName(): AbstractControl {
		return this.customerForm.get('firstName');
	}

	get lastName(): AbstractControl {
		return this.customerForm.get('lastName');
	}

	get notes(): AbstractControl {
		return this.customerForm.get('notes');
	}

	get emailHasError(): boolean {
		return this.email.invalid;
	}

	get emailErrorMessage(): string {
		return this.email.hasError('required')
			   ? 'Email is required'
			   : this.email.hasError('email')
				 ? 'This is not a valid email'
				 : null;
	}

	get companyNameHasError(): boolean {
		return this.companyName.invalid;
	}

	get companyNameErrorMessage(): string {
		return this.companyName.hasError('required') ? 'Company name is required!' : null;
	}

	get contactNumberHasError(): boolean {
		return this.contactNumber.invalid;
	}

	get contactNumberErrorMessage(): string {
		return this.contactNumber.hasError('required') ? 'Contact Number is required' : null;
	}

	submitForm() {
		this.store$.dispatch(ToolbarActions.beginProgressBar());
		const customer = {
			id: null,
			notes: this.notes.value,
			lastName: this.lastName.value,
			firstName: this.firstName.value,
			email: this.email.value,
			description: this.description.value,
			contactNumber: this.contactNumber.value,
			companyName: this.companyName.value
		};
		if (this.data.customer) {
			this.store$.dispatch(CustomerActions.editCustomer({
				editedCustomer: {
					...customer,
					id: this.data.customer.id
				}
			}));
		} else {
			this.store$.dispatch(CustomerActions.createNewCustomer({ customer }));
		}
	}

	cancel() {
		this.dialogRef.close();
	}

}
