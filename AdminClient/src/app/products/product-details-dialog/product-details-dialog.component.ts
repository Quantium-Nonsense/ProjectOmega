import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../models/products/products.model';
import * as fromApp from '../../reducers/index';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import { selectAllSuppliers } from '../../supplier/store/suppliers.reducer';
import { beginProgressBar } from '../../toolbar/store/toolbar.actions';
import { selectIsProgressBarVisible } from '../../toolbar/store/toolbar.reducer';
import { createNewProduct, editNewProduct } from '../store/products.actions';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss']
})
export class ProductDetailsDialogComponent implements OnInit, OnDestroy {
  /**
   * The form
   */
  productItemForm: FormGroup;
  suppliers: SupplierModel[];
  isLoading: boolean;

  private sub: Subscription;

  constructor(
      public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
      private fb: FormBuilder,
      private store$: Store<fromApp.State>,
      @Inject(MAT_DIALOG_DATA) public data: { product: ProductModel }
  ) {
    this.sub = new Subscription();
  }


  ngOnInit(): void {
    this.productItemForm = this.formInitialization();
    this.sub.add(
        this.store$.pipe(select(selectIsProgressBarVisible)).subscribe(isLoading => {
          this.isLoading = isLoading;
          if (isLoading) {
            this.productItemForm.disable();
          } else {
            this.productItemForm.enable();
          }
        })
    );
    this.sub.add(
        this.store$.pipe(select(selectAllSuppliers)).subscribe(sup => this.suppliers = sup)
    );
    if (this.data.product) {
      const prod = this.data.product;
      this.id.setValue(prod.id);
      this.description.setValue(prod.description);
      this.name.setValue(prod.name);
      this.price.setValue(prod.price);
      this.supplier.setValue(prod.supplier);
    }
  }

  compareFun(obj1, obj2) {
    return obj1.id === obj2.id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  isFormValid(): boolean {
    return this.productItemForm.valid;
  }

  private onSaveClick() {
    this.store$.dispatch(beginProgressBar());
    const newProduct = new ProductModel(
        this.data.product ? this.data.product.id : null,
        this.productItemForm.get('name').value,
        this.productItemForm.get('description').value,
        Number(this.price.value),
        this.supplier.value
    );

    if (this.data.product) {
      this.store$.dispatch(editNewProduct({ product: newProduct }));
    } else {
      this.store$.dispatch(createNewProduct({ product: newProduct }));
    }
  }

  private formInitialization = (): FormGroup => {
    return this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      supplier: ['', [Validators.required]]
    });
  };

  get id(): AbstractControl {
    return this.productItemForm.get('id');
  }

  get name(): AbstractControl {
    return this.productItemForm.get('name');
  }

  get description(): AbstractControl {
    return this.productItemForm.get('description');
  }

  get price(): AbstractControl {
    return this.productItemForm.get('price');
  }

  get supplier(): AbstractControl {
    return this.productItemForm.get('supplier');
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
}
