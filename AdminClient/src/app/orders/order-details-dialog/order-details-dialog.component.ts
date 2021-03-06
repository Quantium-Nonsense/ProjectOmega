import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CustomerModel } from '../../models/customers/customer.model';
import { OrderProductModel } from '../../models/orders/oder-product.model';
import { OrderModel } from '../../models/orders/order.model';
import { ProductModel } from '../../models/products/products.model';
import { OrderStatusModel } from '../../shared/model/order/order-status.model';
import { UserModel } from '../../shared/model/user/user.model';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent implements OnInit, OnDestroy {
  /**
   * The form
   */
  orderForm: FormGroup;
  orderProducts: FormArray;
  status = Object.keys(OrderStatusModel);

  products: ProductModel[];
  customers: CustomerModel[];
  repUsers: UserModel[];
  editable: boolean;
  isEdit: boolean;

  private subscriptions = new Subscription();

  constructor(
      public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: {
        order: OrderModel,
        title: string,
        editable: boolean,
        customers: CustomerModel[]
        repUsers: UserModel[],
        products: ProductModel[]
      }
  ) {
    this.customers = data.customers;
    this.repUsers = data.repUsers;
    this.editable = data.editable;
    this.products = data.products;
  }

  ngOnInit(): void {
    [this.orderForm, this.orderProducts] = this.formInitialization();
    this.isEdit = !!this.data.order;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  quantityErrorMessage(index: number): string {
    const quantityCtrl = this.orderProducts.controls[index].get('quantity');

    if (quantityCtrl.hasError('required')) {
      return 'Product quantity is required!';
    }

    if (quantityCtrl.hasError('pattern')) {
      return 'Product quantity must be a whole number';
    }

    if (quantityCtrl.hasError('min')) {
      return 'Product quantity cannot be less than 1';
    }

    return '';
  }


  get statusHasError(): boolean {
    return this.orderForm.get('status').invalid;
  }

  get statusErrorMessage(): string {
    const statusCtrl = this.orderForm.get('status');

    return statusCtrl.hasError('required') ? 'Order Status is required!' : '';
  }

  get userHasError(): boolean {
    return this.orderForm.get('user').invalid;
  }

  get userErrorMessage(): string {
    const statusCtrl = this.orderForm.get('user');

    return statusCtrl.hasError('required') ? 'Representative is required!' : '';
  }

  quantityHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('quantity').invalid;
  }

  productHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('product').invalid;
  }

  productErrorMessage(index: number): string {
    const productCtrl = this.orderProducts.controls[index].get('product');

    return productCtrl.hasError('required') ? 'Product is required!' : '';
  }

  customerHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('customer').invalid;
  }

  customerErrorMessage(index: number): string {
    const customerCtrl = this.orderProducts.controls[index].get('customer');

    return customerCtrl.hasError('required') ? 'Customer is required!' : '';
  }

  isFormValid(): boolean {
    return this.orderForm.valid;
  }

  private onSaveClick() {
    const orderProducts = [];
    for (const orderFormProduct of this.orderProducts.controls) {
      orderProducts.push(new OrderProductModel(
          orderFormProduct.get('quantity').value,
          orderFormProduct.get('product').value,
          orderFormProduct.get('customer').value,
          orderFormProduct.get('subtotal').value
      ));
    }

    const newOrder = new OrderModel(
        this.data.order ? this.data.order.id : null,
        (this.orderForm.get('user').value as UserModel).id,
        this.orderForm.get('status')?.value ?? null,
        this.orderForm.get('totalPrice').value,
        orderProducts
    );

    this.dialogRef.close(newOrder);
  }

  compareFunc(obj1, obj2): boolean {
    return obj1.id === obj2.id;
  }

  private formInitialization = (): [FormGroup, FormArray] => {
    const editable = this.data.editable;
    const initialOrder = this.data.order;

    const orderProducts = new FormArray([], [Validators.minLength(1)]);
    initialOrder?.orderProducts.forEach((orderProduct, index) => {
          const formGroup = new FormGroup({
            quantity: new FormControl({
                  value: initialOrder ? initialOrder.orderProducts[index].quantity : '',
                  disabled: !editable
                },
                [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]
            ),
            product: new FormControl(
                {
                  value: initialOrder ? initialOrder.orderProducts[index].product : '',
                  disabled: !editable
                },
                [Validators.required]
            ),
            customer: new FormControl(
                {
                  value: initialOrder ? initialOrder.orderProducts[index].client : '',
                  disabled: !editable
                },
                [Validators.required]
            ),
            subtotal: new FormControl({
                  value: initialOrder ? initialOrder.orderProducts[index].totalPrice : '',
                  disabled: true
                },
                [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
            )
          });

          this.subscriptions.add(
              formGroup.get('product').valueChanges.subscribe((value) => {
                this.calculatePrices(formGroup);
              })
          );

          this.subscriptions.add(
              formGroup.get('quantity').valueChanges.subscribe((value) => {
                this.calculatePrices(formGroup);
              })
          );

          orderProducts.push(formGroup);
        }
    );

    let form;
    if (this.data.order) {
      form = new FormGroup({
        status: new FormControl({
              value: initialOrder ? initialOrder.status : '',
              disabled: !editable
            },
            [Validators.required]
        ),
        user: new FormControl({
              value: initialOrder ? this.repUsers.find(user => user.id === initialOrder.userId) : '',
              disabled: !editable
            },
            [Validators.required]),
        orderProducts,
        totalPrice: new FormControl(
            {
              value: initialOrder ? initialOrder.totalOrderPrice.toFixed(2) : '',
              disabled: true
            },
            [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
        )
      });
    } else {
      form = new FormGroup({
        user: new FormControl({
              value: initialOrder ? this.repUsers.find(user => user.id === initialOrder.userId) : '',
              disabled: !editable
            },
            [Validators.required]),
        orderProducts,
        totalPrice: new FormControl(
            {
              value: initialOrder ? initialOrder.totalOrderPrice.toFixed(2) : '',
              disabled: true
            },
            [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
        )
      });
    }
    return [form, orderProducts];
  };

  private calculatePrices(orderProduct: FormGroup): void {
    const quantity = parseInt(orderProduct.get('quantity').value, 10);
    const product = orderProduct.get('product');
    const subtotal = (isNaN(quantity) ? 0 : quantity) * (product.value ? product.value.price : 0);
    orderProduct.get('subtotal').setValue(subtotal);

    let total = 0;
    for (const orderFormProduct of (this.orderForm.get('orderProducts') as FormArray).controls) {
      total += parseFloat(orderFormProduct.get('subtotal').value);
    }
    this.orderForm.get('totalPrice').setValue(total);
  }

  private addNewEntry(): void {
    const formGroup = new FormGroup({
      quantity: new FormControl(
          { value: '' },
          [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]
      ),
      product: new FormControl(
          { value: '' },
          [Validators.required]
      ),
      customer: new FormControl(
          { value: '' },
          [Validators.required]
      ),
      subtotal: new FormControl(
          { value: '', disabled: true },
          [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
      )
    });

    this.subscriptions.add(
        formGroup.get('product').valueChanges.subscribe((value) => {
          this.calculatePrices(formGroup);
        })
    );

    this.subscriptions.add(
        formGroup.get('quantity').valueChanges.subscribe((value) => {
          this.calculatePrices(formGroup);
        })
    );

    this.orderProducts.push(formGroup);
  }

  private removeEntry(index: number): void {
    this.orderProducts.removeAt(index);
  }
}
