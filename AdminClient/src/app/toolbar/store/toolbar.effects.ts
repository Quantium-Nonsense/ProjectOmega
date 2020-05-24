import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {delay, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as fromApp from '../../reducers';
import * as ToolbarActions from './toolbar.actions';

@Injectable()
export class ToolbarEffects {

	displayToolbarOnLogout$ = createEffect(() => this.actions$.pipe(
		ofType(ToolbarActions.logoutAttempt),
		map((action: Action) => ToolbarActions.beginProgressBar())
	));

	logoutAttempt$ = createEffect(() => this.actions$.pipe(
		ofType(ToolbarActions.logoutAttempt),
		switchMap((action: Action) => of(this.handleLogout()).pipe(
			switchMap((action1: Action) => [ToolbarActions.stopProgressBar()]),
			delay(2000),
			tap(() => this.router.navigateByUrl('/auth'))
		))
	));

	constructor(
		private store: Store<fromApp.State>,
		private router: Router,
		private actions$: Actions
	) {
	}

	private handleLogout = (): Action => {
		localStorage.removeItem(environment.ACCESS_TOKEN);

		return ToolbarActions.logoutSuccessful();
	};


}
