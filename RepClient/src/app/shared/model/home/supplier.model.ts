export class SupplierModel {
  constructor(
      public id?: number,
      public firstName?: string,
      public lastName?: string,
      public companyName?: string,
      public email?: string,
      public address?: string,
      public postcode?: string,
      public town?: string,
      public county?: string,
      public country?: string,
      public description?: string,
      public contactNumber?: string,
      public notes?: string
  ) {
  }
}
