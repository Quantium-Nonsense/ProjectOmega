import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {State} from '../reducers';
import {LoadingSpinnerService} from '../services/loading-spinner/loading-spinner.service';
import * as AuthActions from './store/auth.actions';
import * as fromAuth from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

  /**
   * The authentication form
   */
  protected authForm: FormGroup;

  /**
   * Holds all the subscriptions that will need to be cleaned up when a view swaps
   */
  private subscriptions = new Subscription();

  /**
   * The url to go to once a login is successful
   */
  private returnUrl: string;

  constructor(
    public loadingSpinnerService: LoadingSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
    this.authForm = this.formInitialization();
    this.loadingSpinnerService.observeNext(this.store.select(fromAuth.selectIsLoading));
    this.subscriptions.add(
      this.store.select('auth').subscribe((state: fromAuth.State) => {
        if (state.errorMessage) {
          this.showMessage(state.errorMessage);
        }
      })
    );
  }

  /**
   * Returns appropriate error message for password validation
   *
   * @returns The error message should the password have an error, empty string otherwise
   */
  protected get passwordErrorMessage(): string {
    const passwordCtrl = this.authForm.get('password');

    return passwordCtrl.hasError('required')
      ? 'Password is required!'
      : passwordCtrl.hasError('minlength')
        ? 'Password should be at least 7 characters long!'
        : '';

  }

  /**
   * Displays a message message on the Auth Page as a little toast at the bottom
   *
   * @param message The message to display
   * @param duration The duration for the message
   */
  public showMessage = (message: string, duration = 2000): void => {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  };

  ngOnDestroy(): void {
    // Clean up all subs to avoid memory leak
    this.subscriptions.unsubscribe();
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
   *
   * @returns true if the email is invalid, false if it is valid
   */
  get emailHasError(): boolean {
    return this.authForm.get('email').invalid;
  }

  protected isFormValid(): boolean {
    return this.authForm.valid;
  }

  /**
   * @returns string with the appropriate error message for email validation
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
   *
   * @returns true if the password is in an invalid format, false otherwise
   */
  get passwordHasError(): boolean {
    return this.authForm.get('password').invalid;
  }

  /**
   * Simply initializes the form to be used with default values and validators
   *
   * A big note for this class is that the Form state is not stored in the global store object state
   * The reason behind this is that a form state that has not been submitted is a very localized state and should NOT
   * be shared Between components thus does not belong in the global app store state, rather when a form is submitted
   * then use the app store
   *
   * @returns the form with initialized fields
   */
  private formInitialization = (): FormGroup =>
    new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
}
