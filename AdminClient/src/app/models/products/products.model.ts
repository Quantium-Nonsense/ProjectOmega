export class ProductModel {
  constructor(
    public id: number,
    public supplier: string,
    public supplierId: number,
    public name: string,
    public description: string,
    public price: number,
  ) {
  }

  public equalsWithoutId(p: ProductModel): boolean {
    return (
      this.supplier === p.supplier
      && this.supplierId === p.supplierId
      && this.name === p.name
      && this.description === p.description
      && this.price === p.price
    );
  }

}
