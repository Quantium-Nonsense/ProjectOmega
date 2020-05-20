import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MockProductsAPI } from '../../../data/products/products-data';
import { CustomerModel } from '../../models/customers/customer.model';
import { OrderProductModel } from '../../models/orders/oder-product.model';
import { OrderModel } from '../../models/orders/order.model';
import { ProductModel } from '../../models/products/products.model';
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
  protected orderForm: FormGroup;
  protected orderProducts: FormArray;
  private subscriptions = new Subscription();

  private readonly products: ProductModel[];
  private readonly customers: CustomerModel[];
  private readonly repUsers: UserModel[];
  private editable: boolean;

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      order: OrderModel,
      title: string,
      editable: boolean,
      customers: CustomerModel[]
      repUsers: UserModel[]
    },
  ) {
    this.products = MockProductsAPI.getInstance().getAll();
    this.customers = data.customers;
    this.repUsers = data.repUsers;
    this.editable = data.editable;
  }

  ngOnInit(): void {
    [this.orderForm, this.orderProducts] = this.formInitialization();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected get dateHasError(): boolean {
    return this.orderForm.get('orderDate').invalid;
  }

  protected get dateErrorMessage(): string {
    const dateCtrl = this.orderForm.get('orderDate');

    return dateCtrl.hasError('required') ? 'Order Date is required!' : '';
  }

  protected get statusHasError(): boolean {
    return this.orderForm.get('status').invalid;
  }

  protected get statusErrorMessage(): string {
    const statusCtrl = this.orderForm.get('status');

    return statusCtrl.hasError('required') ? 'Order Status is required!' : '';
  }

  protected get userHasError(): boolean {
    return this.orderForm.get('user').invalid;
  }

  protected get userErrorMessage(): string {
    const statusCtrl = this.orderForm.get('user');

    return statusCtrl.hasError('required') ? 'Representative is required!' : '';
  }

  protected quantityHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('quantity').invalid;
  }

  protected quantityErrorMessage(index: number): string {
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

  protected productHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('product').invalid;
  }

  protected productErrorMessage(index: number): string {
    const productCtrl = this.orderProducts.controls[index].get('product');

    return productCtrl.hasError('required') ? 'Product is required!' : '';
  }

  protected customerHasError(index: number): boolean {
    return this.orderProducts.controls[index].get('customer').invalid;
  }

  protected customerErrorMessage(index: number): string {
    const customerCtrl = this.orderProducts.controls[index].get('customer');

    return customerCtrl.hasError('required') ? 'Customer is required!' : '';
  }

  protected isFormValid(): boolean {
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
      this.orderForm.get('orderDate').value,
      this.repUsers.findIndex(user => user.email === this.orderForm.get('user').value),
      this.orderForm.get('status').value,
      this.orderForm.get('totalPrice').value,
      orderProducts
    );

    this.dialogRef.close(newOrder);
  }

  private formInitialization = (): [FormGroup, FormArray] => {
    const editable = this.data.editable;
    const initialOrder = this.data.order;

    const orderProducts = new FormArray([], [Validators.minLength(1)]);
    if (initialOrder) {
      initialOrder.orderProducts.forEach((orderProduct, index) => {
          const formGroup = new FormGroup({
            quantity: new FormControl({
                value: initialOrder ? initialOrder.orderProducts[index].quantity : '',
                disabled: !editable,
              },
              [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]
            ),
            product: new FormControl(
              {
                value: initialOrder ? initialOrder.orderProducts[index].product : '',
                disabled: !editable,
              },
              [Validators.required],
            ),
            customer: new FormControl(
              {
                value: initialOrder ? initialOrder.orderProducts[index].client : '',
                disabled: !editable,
              },
              [Validators.required],
            ),
            subtotal: new FormControl({
                value: initialOrder ? initialOrder.orderProducts[index].totalPrice : '',
                disabled: true,
              },
              [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
            ),
          });

          this.subscriptions.add(
            formGroup.get('product').valueChanges.subscribe((value) => {
              this.calculatePrices(formGroup);
            }),
          );

          this.subscriptions.add(
            formGroup.get('quantity').valueChanges.subscribe((value) => {
              this.calculatePrices(formGroup);
            })
          );

          orderProducts.push(formGroup);
        }
      );

      const form = new FormGroup({
        orderDate: new FormControl({
            value: initialOrder ? new Date(initialOrder.dateCreated) : new Date(),
            disabled: !editable,
          },
          [Validators.required],
        ),
        status: new FormControl({
            value: initialOrder ? initialOrder.status : '',
            disabled: !editable
          },
          [Validators.required]
        ),
        user: new FormControl({
            value: initialOrder ? this.repUsers.find(user => user.id === initialOrder.userId) : '',
            disabled: !editable,
          },
          [Validators.required]),
        orderProducts,
        totalPrice: new FormControl(
          {
            value: initialOrder ? initialOrder.totalOrderPrice.toFixed(2) : '',
            disabled: true
          },
          [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)],
        )
      });

      return [form, orderProducts];
    }
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
    this.orderForm.get('total').setValue(total);
  }

  private addNewEntry(): void {
    const formGroup = new FormGroup({
      quantity: new FormControl(
        { value: '' },
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]
      ),
      product: new FormControl(
        { value: '' },
        [Validators.required],
      ),
      customer: new FormControl(
        { value: '' },
        [Validators.required],
      ),
      subtotal: new FormControl(
        { value: '', disabled: true },
        [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{2})?$/)]
      ),
    });

    this.subscriptions.add(
      formGroup.valueChanges.subscribe((value) => {
        this.calculatePrices(formGroup);
      }),
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
