import * as fromApp from '../reducers/index';

export const emptyState: fromApp.State = {
  user: {
    roles: [],
    users: []
  },
  auth: {
    user: null,
    returnUrl: null,
    errorMessage: null,
    loading: false
  },
  suppliers: {
    suppliers: [],
    loading: false
  },
  orders: {
    orders: []
  },
  customers: {
    customers: []
  },
  products: {
    products: []
  },
  toolbar: {
    progressBar: false
  },
};
