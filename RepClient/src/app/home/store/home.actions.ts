import { createAction, props } from '@ngrx/store';
import { CompanyModel } from '../../shared/model/home/company.model';

export const beginLoadingDashboard = createAction(
  '[Home - Page] Loading Dashboard'
);

export const dashboardLoaded = createAction(
  '[Home - Page] Dashboard Has Loaded',
  props<{ companies: CompanyModel[] }>()
);

export const dashboardCleanUp = createAction(
  '[Dashboard - Page] Dashboard Clean up requested'
);
