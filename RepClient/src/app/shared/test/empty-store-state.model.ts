import * as fromApp from './../../reducers/index';

/**
 * This should only be used for testing purposes
 * Provides an empty state for all parts of the store
 */
export const mockEmptyState: fromApp.AppState = {
  auth: {
    errorMessage: 'Some Error message',
    loading: false,
    user: undefined
  },
  company: {
    company: undefined,
    companyItems: undefined,
    errorMessage: undefined,
    loading: false
  },
  home: {
    companies: undefined,
    loading: false
  }
};
