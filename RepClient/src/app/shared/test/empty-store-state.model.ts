import * as fromApp from './../../reducers/index';

/**
 * This should only be used for testing purposes
 */
export const mockEmptyState: fromApp.AppState = {
  auth: {
    errorMessage: 'Some Error message',
    loading: false,
    user: undefined
  },
  company: undefined,
  home: undefined
};
