import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../data/products/products-datasource';
import { Supplier, SuppliersDataSource } from '../../../data/supplier/supplier-datasource';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss']
})
export class ProductDetailsDialogComponent implements OnInit {
  /**
   * The form
   */
  protected productItemForm: FormGroup;

  private suppliers: Supplier[];

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    @Inject(MAT_DIALOG_DATA) private title: string,
    @Inject(MAT_DIALOG_DATA) private editable: boolean,
  ) {
    this.suppliers = SuppliersDataSource.getInstance().getAll();
  }

  protected get supplierHasError(): boolean {
    return this.productItemForm.get('supplier').invalid;
  }

  protected get supplierErrorMessage(): string {
    const supplierCtrl = this.productItemForm.get('supplier');

    return supplierCtrl.hasError('required') ? 'Supplier is required!' : '';
  }

  protected get nameHasError(): boolean {
    return this.productItemForm.get('name').invalid;
  }

  protected get nameErrorMessage(): string {
    const nameCtrl = this.productItemForm.get('name');

    return nameCtrl.hasError('required') ? 'Product name is required!' : '';
  }

  protected get descriptionHasError(): boolean {
    return this.productItemForm.get('description').invalid;
  }

  protected get descriptionErrorMessage(): string {
    const descriptionCtrl = this.productItemForm.get('decsription');

    return descriptionCtrl.hasError('required') ? 'Description is required!' : '';
  }

  protected get priceHasError(): boolean {
    return this.productItemForm.get('price').invalid;
  }

  protected get priceErrorMessage(): string {
    const priceCtrl = this.productItemForm.get('price');

    if (priceCtrl.hasError('required')) {
      return 'Price is required!';
    }

    if (priceCtrl.hasError('pattern')) {
      return 'Price must be a valid number';
    }

    if (priceCtrl.hasError('min')) {
      return 'Price must be greater than 0';
    }
    return '';
  }

  ngOnInit(): void {
  }

  protected isFormValid(): boolean {
    return this.productItemForm.valid;
  }

  private onSaveClick() {
    const newProduct: Product = {
      id: this.data.id,
      supplier: this.productItemForm.get('supplier').value.name,
      supplierId: this.productItemForm.get('supplier').value.id,
      name: this.productItemForm.get('name').value,
      description: this.productItemForm.get('description').value,
      price: this.productItemForm.get('price').value,
    };

    this.dialogRef.close(newProduct);
  }

  private formInitialization = (initialProduct: Product = {
    id: null,
    supplier: '',
    supplierId: null,
    name: '',
    description: '',
    price: null,
  }): FormGroup => {

    return new FormGroup({
      supplier: new FormControl(
        this.suppliers.find((element) => element.id === initialProduct.supplierId),
        [Validators.required],
      ),
      name: new FormControl(
        initialProduct.name,
        [Validators.required],
      ),
      description: new FormControl(
        initialProduct.description,
        [Validators.required],
      ),
      price: new FormControl(
        initialProduct.price,
        [Validators.required, Validators.min(0), Validators.pattern(/\d+(\.\d{2})?/)],
      )
    });
  };
}
