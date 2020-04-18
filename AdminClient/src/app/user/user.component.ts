import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../reducers/index';
import * as fromUser from './store/user.reducer';
import * as UserActions from './store/user.actions';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoading: Observable<boolean>;

  constructor(
    private store: Store<fromApp.State>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.beginLoadingUserPage());
    this.isLoading = this.store.select(fromUser.selectIsLoading);
  }

}
