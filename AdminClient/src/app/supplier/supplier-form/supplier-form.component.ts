import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../reducers';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import * as SupplierActions from '../../supplier/store/suppliers.actions';
import * as fromToolbar from '../../toolbar/store/toolbar.reducer';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit, OnDestroy {
  supplierForm: FormGroup;
  isLoading: boolean;

  private sub: Subscription;

  constructor(
      private store$: Store<fromApp.State>,
      private dialogRef: MatDialogRef<SupplierFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        formType: 'edit' | 'create',
        supplier: SupplierModel
      }
  ) {

  }

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
    return this.supplierForm.get('companyName');
  }

  get contactNumber(): AbstractControl {
    return this.supplierForm.get('contactNumber');
  }

  get description(): AbstractControl {
    return this.supplierForm.get('description');
  }

  get email(): AbstractControl {
    return this.supplierForm.get('email');
  }

  get firstName(): AbstractControl {
    return this.supplierForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.supplierForm.get('lastName');
  }

  get notes(): AbstractControl {
    return this.supplierForm.get('notes');
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

  ngOnInit(): void {
    this.sub = new Subscription();
    this.supplierForm = this.initializeForm();
    this.sub.add(
        this.store$.select(fromToolbar.selectShowProgressBar)
            .subscribe(isLoading => {
              if (isLoading) {
                this.supplierForm.disable();
                this.isLoading = isLoading;
              } else {
                this.supplierForm.enable();
                this.isLoading = isLoading;
              }
            })
    );
    const supplier = this.data.supplier;
    if (supplier) {
      this.companyName.setValue(supplier.companyName);
      this.contactNumber.setValue(supplier.contactNumber);
      this.description.setValue(supplier.description);
      this.email.setValue(supplier.email);
      this.firstName.setValue(supplier.firstName);
      this.lastName.setValue(supplier.lastName);
      this.notes.setValue(supplier.notes);
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

  submitForm() {
    if (this.data.formType === 'create') {
      this.store$.dispatch(SupplierActions.attemptToCreateNewSupplier({
        supplier: {
          id: null,
          notes: this.notes.value,
          lastName: this.lastName.value,
          firstName: this.firstName.value,
          email: this.email.value,
          description: this.description.value,
          contactNumber: this.contactNumber.value,
          companyName: this.companyName.value
        }
      }));
    } else {
      this.store$.dispatch(SupplierActions.editSupplier({
        editedSupplier: {
          id: null,
          notes: this.notes.value,
          lastName: this.lastName.value,
          firstName: this.firstName.value,
          email: this.email.value,
          description: this.description.value,
          contactNumber: this.contactNumber.value,
          companyName: this.companyName.value
        }
      }));
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
