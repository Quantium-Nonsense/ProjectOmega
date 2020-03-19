import { createAction, props } from '@ngrx/store';
import { CompanyModel } from '../../models/home/company.model';

export const beginLoadingDashboard = createAction(
  '[Home - Page] Loading Dashboard'
);

export const dashboardLoaded = createAction(
  '[Home - Page] Dashboard Has Loaded',
  props<{ companies: CompanyModel[] }>()
);
