import { createAction, props } from '@ngrx/store';
import { CompanyModel } from '../../shared/model/home/company.model';

export const beginLoadingDashboard = createAction(
    '[Home - Page] Loading Dashboard'
);

export const dashboardHasError = createAction(
    '[Home - Effects] Dashboard has error',
    props<{ error: string }>()
);

export const dashboardDoneLoading = createAction(
    '[Home - Effects] Dashboard done loading'
);

export const showCompanies = createAction(
    '[Home - Page] Dashboard Has Loaded',
    props<{ companies: CompanyModel[] }>()
);

export const dashboardCleanUp = createAction(
    '[Dashboard - Page] Dashboard Clean up requested'
);
