export const commonEnvironment = {
  DELETE_USER_CONFIRM_TEXT: 'Are you sure you want to delete this user?',
  DELETE_USER_BUTTON_TEXT: 'Delete User',
  CONFIRMATION_TEXT: 'Confirm',
  CANCELLATION_TEXT: 'Cancel',
  DELETE_CUSTOMER_CONFIRM_TEXT: 'Are you sure you want to delete this customer?',
  DELETE_CUSTOMER_TITLE: 'Delete Customer',
  apiPath: window['env'] ? window['env']['apiRoot'] : '40.65.236.154',
  apiRoot: () => 'http://40.65.236.154/api',
  logApiRoot: () => 'http://40.65.236.154/log',
  gitCompany: window['env'] ? window['env']['company'] : ''
};
