import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
import * as AuthActions from './store/auth.actions';
import { AuthState } from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html'
})

export class AuthPage implements OnInit {

  /**
   * The authentication form
   */
  protected authForm: FormGroup;

  /**
   * Holds all the subscriptions that will need to be cleaned up when a view swaps
   */
  private subscriptions = new Subscription();

  /**
   * This is the loader that was created and currently exists on the page
   * This variable will be used to dismiss that existing loader
   */
  private pageLoader: HTMLIonLoadingElement;

  constructor(
    public menuController: MenuController,
    public loadingController: LoadingController,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {

  }

  ionViewWillEnter(): void {
    // Disable sideway scroll on log in page
    this.menuController.enable(false);
    this.subscriptions.add(
      this.store.select('auth').subscribe((state: AuthState) => {
        if (state.errorMessage) {
          this.showMessage(state.errorMessage);
        }
        this.handleLoaderDisplay(state.loading);
      })
    );
  }

  ionViewWillLeave(): void {
    // Clean up all subs to avoid memory leak
    this.subscriptions.unsubscribe();

    // Ensure the loader is no longer visible as we are being redirected and that page will display if needed
    this.pageLoader.dismiss();
  }

  ngOnInit(): void {
    this.authForm = this.formInitialization();
  }

  /**
   * Submit form
   */
  protected onSubmit(): void {
    this.store.dispatch(AuthActions.loginAttempt({
      email: this.authForm.get('email').value as string,
      password: this.authForm.get('password').value as string
    }));
  }

  /**
   * Check if email is in the correct format
   */
  get emailHasError(): boolean {
    return this.authForm.get('email').invalid;
  }

  /**
   * Returns appropriate error message for password validation
   */
  protected get passwordErrorMessage(): string {
    const passwordCtrl = this.authForm.get('password');

    return passwordCtrl.hasError('required')
      ? 'Password is required!'
      ? 'Password is required!'
      : passwordCtrl.hasError('minlength')
        ? 'Password should be at least 7 characters long!'
        : '';

  }

  protected isFormValid(): boolean {
    return this.authForm.valid;
  }

  /**
   * Displays a message message on the Auth Page as a little toast at the bottom
   * @param message The message to display
   * @param duration The duration for the message
   */
  showMessage = (message: string, duration = 2000): void => {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  };

  /**
   * Returns appropriate error message for email validation
   */
  get emailErrorMessage(): string {
    const emailCtrl = this.authForm.get('email');

    return emailCtrl.hasError('required') // Check if email has been filled
      ? 'Email is required!'
      : emailCtrl.hasError('email') // If yes check if valid email
        ? 'Not a valid email'
        : '';
  }

  /**
   * Check if password is in correct format
   */
  get passwordHasError(): boolean {
    return this.authForm.get('password').invalid;
  }

  /**
   * Decides if page should display the loading spinner
   * @param shouldBeDisplayed If loader should be displayed
   */
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

  /**
   * Simply initializes the form to be used with default values and validators
   *
   * A big note for this class is that the Form state is not stored in the global store object state
   * The reason behind this is that a form state that has not been submitted is a very localized state and should NOT be shared
   * Between components thus does not belong in the global app store state, rather when a form is submitted then use the app store
   */
  private formInitialization = (): FormGroup =>
    new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
}
