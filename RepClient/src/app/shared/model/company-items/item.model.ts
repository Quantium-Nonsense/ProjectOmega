import { SupplierModel } from '../home/supplier.model';

export class ItemModel {

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public companyId: string,
    public supplier?: SupplierModel
    ) {

  }

}
