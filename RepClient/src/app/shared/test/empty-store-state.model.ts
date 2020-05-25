import * as fromApp from './../../reducers/index';

/**
 * This should only be used for testing purposes
 * Provides an empty state for all parts of the store
 */
export const mockEmptyState: fromApp.State = {
  auth: {
    errorMessage: undefined,
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
    errorMessage: undefined,
    companies: undefined,
    loading: false
  },
  order: {
    clients: undefined,
    items: undefined
  },
  addCustomer: {
    errorMessage: undefined,
    loading: undefined
  }
};
