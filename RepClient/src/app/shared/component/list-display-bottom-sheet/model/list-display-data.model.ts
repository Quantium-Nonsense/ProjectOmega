import { SupplierModel } from '../../../model/home/supplier.model';

export interface ListDisplayDataModel {
  companies: SupplierModel[];
  action?(data?: SupplierModel): void;
}
