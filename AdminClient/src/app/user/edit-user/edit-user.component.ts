import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../reducers/index';
import { RoleModel } from '../../shared/model/role/role.model';
import { UserModel } from '../../shared/model/user/user.model';
import { selectIsToolbarVisible } from '../../toolbar/store/toolbar.reducer';
import { selectRoles } from '../store/user.reducer';
import * as UserActions from './../store/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  availableRoles: RoleModel[];
  isLoading: boolean;

  private subscription: Subscription;

  constructor(
      private fb: FormBuilder,
      private store: Store<fromApp.State>,
      @Inject(MAT_DIALOG_DATA) public data: {
        formType: 'edit' | 'create',
        user: UserModel
      }
  ) {
    this.subscription = new Subscription();
    this.userForm = this.formInitialization();
  }

  ngOnInit(): void {
    this.subscription.add(this.store.pipe(select(selectRoles)).subscribe(roles => this.availableRoles = roles));
    this.subscription.add(this.store.pipe(select(selectIsToolbarVisible)).subscribe(isLoading => {
      this.isLoading = isLoading;
      if (isLoading) {
        this.userForm.disable();
      } else {
        this.userForm.enable();
      }
    }));
    if (this.data.user) {
      this.email.setValue(this.data.user.email);
      this.roles.setValue(this.data.user.roles);
    }
  }


  get email(): AbstractControl {
    return this.userForm.get('email');
  }

  get roles(): AbstractControl {
    return this.userForm.get('roles');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    this.store.dispatch(UserActions.editUser({
      user: {
        id: this.data.user.id,
        roles: this.roles.value,
        email: this.email.value as string,
        password: null
      }
    }));
  }

  isFormValid(): boolean {
    return this.userForm.valid;
  }

  /**
   * @returns string with the appropriate error message for email validation
   */
  get emailErrorMessage(): string {
    const emailCtrl = this.userForm.get('email');

    return emailCtrl.hasError('required') // Check if email has been filled
           ? 'Email is required!'
           : emailCtrl.hasError('email') // If yes check if valid email
             ? 'Not a valid email'
             : '';
  }

  get roleHasError(): boolean {
    return this.roles.invalid;
  }

  get roleErrorMessage(): string {
    return this.roles.hasError('required') ? 'Role cannot be empty' : '';
  }

  compareWith(obj1, obj2) {
    return obj1.id === obj2.id;
  }

  private formInitialization = (): FormGroup => {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      roles: ['', [Validators.required]]
    });
  };


  get emailHasError() {
    return this.email.invalid;
  }
}
