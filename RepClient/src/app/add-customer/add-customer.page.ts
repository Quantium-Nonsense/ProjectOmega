import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { getSessionID } from '../session-id';
import * as fromApp from './../reducers/index';
import * as AddCustomerActions from './store/add-customer.actions';
import { AddCustomerState } from './store/add-customer.reducer';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss']
})
export class AddCustomerPage implements OnInit {

  protected addCustomerForm: FormGroup;

  private subscriptions = new Subscription();

  private pageLoader: HTMLIonLoadingElement;

  constructor(
      public menuController: MenuController,
      public loadingController: LoadingController,
      private store: Store<fromApp.State>,
      private snackBar: MatSnackBar,
      private logger: NGXLogger
  ) {

  }

  ionViewWillEnter(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Entering Add Customers Screen`);
    this.menuController.enable(false);
    this.subscriptions.add(
        this.store.select('addCustomer').subscribe((state: AddCustomerState) => {
          if (state.errorMessage) {
            this.showMessage(state.errorMessage);
          }
          this.handleLoaderDisplay(state.loading);
        })
    );
  }

  ionViewWillLeave(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Leaving Add Customers Screen`);
    this.subscriptions.unsubscribe();
    this.pageLoader.dismiss();
  }

  // Submit form button
  protected onSave(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Saving new customer`);
    this.store.dispatch(AddCustomerActions.addAttempt({
      title: this.addCustomerForm.get('title').value as string,
      firstName: this.addCustomerForm.get('firstName').value as string,
      lastName: this.addCustomerForm.get('lastName').value as string,
      companyName: this.addCustomerForm.get('companyName').value as string,
      companyRole: this.addCustomerForm.get('companyRole').value as string,
      companyAddress: this.addCustomerForm.get('companyAddress').value as string,
      emailAddress: this.addCustomerForm.get('emailAddress').value as string,
      mobileNumber: this.addCustomerForm.get('mobileNumber').value as string
    }));
  }

  ngOnInit(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Initializing Add Customers Screen`);
    this.addCustomerForm = this.formInitialization();
  }

  protected formValid(): boolean {
    return this.addCustomerForm.valid;
  }

  showMessage = (message: string, duration = 2000): void => {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  };

  handleLoaderDisplay = (shouldBeDisplayed: boolean): void => {
    if (!shouldBeDisplayed && this.pageLoader) {
      this.pageLoader.dismiss();

      return;
    }
    if (shouldBeDisplayed) {
      this.loadingController.create({
        message: 'Loading...'
      }).then(loader => {
        this.pageLoader = loader;
        this.pageLoader.present();
      });
    }
  };

  // Title is required
  get titleHasError(): boolean {
    return this.addCustomerForm.get('title').invalid;
  }

  get titleErrorMessage(): string {
    const titleCtrl = this.addCustomerForm.get('title');

    return titleCtrl.hasError('required')
           ? 'Title is required!'
           : '';
  }

  // First name is required
  get firstNameHasError(): boolean {
    return this.addCustomerForm.get('firstName').invalid;
  }

  get firstNameErrorMessage(): string {
    const firstNameCtrl = this.addCustomerForm.get('firstName');

    return firstNameCtrl.hasError('required')
           ? 'First Name is required!'
           : '';
  }

  // Lirst name is required
  get lastNameHasError(): boolean {
    return this.addCustomerForm.get('lastName').invalid;
  }

  get lastNameErrorMessage(): string {
    const lastNameCtrl = this.addCustomerForm.get('lastName');

    return lastNameCtrl.hasError('required')
           ? 'Last Name is required!'
           : '';
  }

  // Company name is required
  get companyNameHasError(): boolean {
    return this.addCustomerForm.get('companyName').invalid;
  }

  get companyNameErrorMessage(): string {
    const companyNameCtrl = this.addCustomerForm.get('companyName');

    return companyNameCtrl.hasError('required')
           ? 'Company Name is required!'
           : '';
  }

  // Company role is required
  get companyRoleHasError(): boolean {
    return this.addCustomerForm.get('companyRole').invalid;
  }

  get companyRoleErrorMessage(): string {
    const companyRoleCtrl = this.addCustomerForm.get('companyRole');

    return companyRoleCtrl.hasError('required')
           ? 'Company role is required!'
           : '';
  }

  // Company address is required
  get companyAddressHasError(): boolean {
    return this.addCustomerForm.get('companyAddress').invalid;
  }

  get companyAddressErrorMessage(): string {
    const companyAddressCtrl = this.addCustomerForm.get('companyAddress');

    return companyAddressCtrl.hasError('required')
           ? 'Company address is required!'
           : '';
  }

  // Email address is required
  get emailAddressHasError(): boolean {
    return this.addCustomerForm.get('emailAddress').invalid;
  }

  get emailAddressErrorMessage(): string {
    const emailAddressCtrl = this.addCustomerForm.get('emailAddress');

    return emailAddressCtrl.hasError('required')
           ? 'Email address is required!'
           : '';
  }

  // Mobile number is required
  get mobileNumberHasError(): boolean {
    return this.addCustomerForm.get('mobileNumber').invalid;
  }

  get mobileNumberErrorMessage(): string {
    const mobileNumberCtrl = this.addCustomerForm.get('mobileNumber');

    return mobileNumberCtrl.hasError('required')
           ? 'Mobile number is required!'
           : '';
  }

  // Initial form
  private formInitialization = (): FormGroup =>
      new FormGroup({
        title: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        companyName: new FormControl('', [Validators.required]),
        companyRole: new FormControl('', [Validators.required]),
        companyAddress: new FormControl('', [Validators.required]),
        emailAddress: new FormControl('', [Validators.required]),
        mobileNumber: new FormControl('', [Validators.required])
      });
}
