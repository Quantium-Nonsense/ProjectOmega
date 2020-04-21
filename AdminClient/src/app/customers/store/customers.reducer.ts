import {CustomerModel} from '../../models/customers/customer.model';

export interface State {
	loading: boolean,
	customers: CustomerModel
}
