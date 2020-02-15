import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
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

  constructor(
    public menuController: MenuController,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
  }

  async ionViewWillEnter(): Promise<void> {
    // Disable sideway scroll on log in page
    await this.menuController.enable(false);
    this.subscriptions.add(
      this.store.select('auth').subscribe((state: AuthState) => {
        if (state.errorMessage) {
          this.showMessage(state.errorMessage);
        }
      })
    );
  }

  ionViewWillLeave(): void {
    // Clean up all subs to avoid memory leak
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.authForm = this.formInitialization();
  }

  /**
   * Check if email is in the correct format
   */
  protected get emailHasError(): boolean {
    return this.authForm.get('email').invalid;
  }

  /**
   * Returns appropriate error message for email validation
   */
  protected get emailErrorMessage(): string {
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
  protected get passwordHasError(): boolean {
    return this.authForm.get('password').invalid;
  }

  /**
   * Returns appropriate error message for password validation
   */
  protected get passwordErrorMessage(): string {
    const passwordCtrl = this.authForm.get('password');

    return passwordCtrl.hasError('required')
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
  private showMessage = (message: string, duration = 2000): void => {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
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
