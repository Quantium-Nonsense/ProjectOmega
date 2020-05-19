import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from '../../models/products/products.model';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';

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

  private suppliers: SupplierModel[];

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { product: ProductModel, title: string, editable: boolean },
  ) {
    this.suppliers = null;
  }

  get supplierHasError(): boolean {
    return this.productItemForm.get('supplier').invalid;
  }

  get supplierErrorMessage(): string {
    const supplierCtrl = this.productItemForm.get('supplier');

    return supplierCtrl.hasError('required') ? 'Supplier is required!' : '';
  }

  get nameHasError(): boolean {
    return this.productItemForm.get('name').invalid;
  }

  get nameErrorMessage(): string {
    const nameCtrl = this.productItemForm.get('name');

    return nameCtrl.hasError('required') ? 'Product name is required!' : '';
  }

  get descriptionHasError(): boolean {
    return this.productItemForm.get('description').invalid;
  }

  get descriptionErrorMessage(): string {
    const descriptionCtrl = this.productItemForm.get('description');

    return descriptionCtrl.hasError('required') ? 'Description is required!' : '';
  }

  get priceHasError(): boolean {
    return this.productItemForm.get('price').invalid;
  }

  get priceErrorMessage(): string {
    const priceCtrl = this.productItemForm.get('price');

    if (priceCtrl.hasError('required')) {
      return 'Price is required!';
    }

    if (priceCtrl.hasError('pattern')) {
      return 'Price must be a valid amount with either 0 or 2 decimal places';
    }

    if (priceCtrl.hasError('min')) {
      return 'Price must be greater than 0';
    }
    return '';
  }

  ngOnInit(): void {
    this.productItemForm = this.formInitialization();
  }

  isFormValid(): boolean {
    return this.productItemForm.valid;
  }

  private onSaveClick() {
    const newProduct = new ProductModel(
      this.data.product ? this.data.product.id : null,
      this.productItemForm.get('supplier').value.name,
      this.productItemForm.get('supplier').value.id,
      this.productItemForm.get('name').value,
      this.productItemForm.get('description').value,
      parseFloat(this.productItemForm.get('price').value)
    );

    this.dialogRef.close(newProduct);
  }

  private formInitialization = (): FormGroup => {
    const editable = this.data.editable;
    const initialProduct = this.data.product;

    return new FormGroup({
      supplier: new FormControl(
        {
          value: initialProduct ? this.suppliers.find((element) => +element.id === initialProduct.id) : '',
          disabled: !editable,
        },
        [Validators.required],
      ),
      name: new FormControl(
        {
          value: initialProduct ? initialProduct.name : '',
          disabled: !editable,
        },
        [Validators.required],
      ),
      description: new FormControl(
        {
          value: initialProduct ? initialProduct.description : '',
          disabled: !editable,
        },
        [Validators.required],
      ),
      price: new FormControl(
        {
          value: initialProduct ? initialProduct.price.toFixed(2) : '',
          disabled: !editable
        },
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)],
      )
    });
  };
}
