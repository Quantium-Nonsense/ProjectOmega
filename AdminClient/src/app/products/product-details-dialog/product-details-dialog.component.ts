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
    @Inject(MAT_DIALOG_DATA) private data: { product: Product, title: string, editable: boolean },
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
    const descriptionCtrl = this.productItemForm.get('description');

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

  protected isFormValid(): boolean {
    return this.productItemForm.valid;
  }

  private onSaveClick() {
    const newProduct: Product = {
      id: this.data.product ? this.data.product.id : null,
      supplier: this.productItemForm.get('supplier').value.name,
      supplierId: this.productItemForm.get('supplier').value.id,
      name: this.productItemForm.get('name').value,
      description: this.productItemForm.get('description').value,
      price: parseFloat(this.productItemForm.get('price').value),
    };

    this.dialogRef.close(newProduct);
  }

  private formInitialization = (): FormGroup => {
    const editable = this.data.editable;
    const initialProduct = this.data.product;
    console.log(initialProduct);

    return new FormGroup({
      supplier: new FormControl(
        {
          value: initialProduct ? this.suppliers.find((element) => element.id === initialProduct.supplierId) : '',
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
