import { SupplierModel } from '../../shared/model/supplier/supplier.model';

export class ProductModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public supplier: SupplierModel
  ) {
  }

}
