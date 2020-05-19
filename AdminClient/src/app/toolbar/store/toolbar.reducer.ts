import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import * as ToolbarActions from './toolbar.actions';

export interface State {
	progressBar: boolean;
}

const initialState: State = {
	progressBar: false
};

export const selectToolbarState = createFeatureSelector<fromApp.State, State>('toolbar');

export const selectIsVisible = createSelector(
	selectToolbarState,
	(state: State) => state.progressBar
);

// eslint-disable-next-line no-underscore-dangle
const _toolbarReducer = createReducer(
	initialState,
	on(ToolbarActions.beginProgressBar, (prevState) => ({
		...prevState,
		progressBar: true
	})),
	on(ToolbarActions.stopProgressBar, (prevState) => ({
		...prevState,
		progressBar: false
	}))
);

export const toolbarReducer = (state: State | undefined, action: Action): State => _toolbarReducer(state, action);
