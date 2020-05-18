import { createAction, props } from '@ngrx/store';
import { SupplierModel } from '../../shared/model/home/supplier.model';

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
    props<{ companies: SupplierModel[] }>()
);

export const dashboardCleanUp = createAction(
    '[Dashboard - Page] Dashboard Clean up requested'
);
