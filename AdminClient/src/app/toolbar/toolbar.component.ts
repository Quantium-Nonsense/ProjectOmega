import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import * as ToolbarActions from './store/toolbar.actions';
import * as fromToolbar from './store/toolbar.reducer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Output() sideNavOpenChange = new EventEmitter();

  private showProgressBar: Observable<boolean>;

  private _sideNavOpen: boolean;

  constructor(
    private router: Router,
    private store: Store<State>,
  ) {
    this.showProgressBar = new Observable<boolean>();
  }

  @Input()
  get sideNavOpen(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._sideNavOpen;
  }

  set sideNavOpen(value) {
    // eslint-disable-next-line no-underscore-dangle
    this._sideNavOpen = value;
    this.sideNavOpenChange.emit(this._sideNavOpen);
  }

  ngOnInit(): void {
    this.showProgressBar = this.store.select(fromToolbar.selectIsProgressBarVisible);
  }

  handleLogout(): void {
    this.store.dispatch(ToolbarActions.logoutAttempt());
  }

}
