import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../../order/store/order.actions';
import { selectItems } from '../../../order/store/order.reducer';
import * as fromApp from '../../../reducers/index';
import { ItemModel } from '../../model/company-items/item.model';
import { OrderItemModel } from '../../model/order/order-item.model';

@Component({
  selector: 'app-add-remove-item',
  templateUrl: './add-remove-item.component.html',
  styleUrls: ['./add-remove-item.component.scss']
})
export class AddRemoveItemComponent implements OnInit {

  @Input() item: ItemModel;

  order: OrderItemModel[];

  constructor(
    private store: Store<fromApp.State>
  ) {
  }

  ngOnInit(): void {
    this.store.select(selectItems).subscribe(items => this.order = items);
  }

  addItem(item: ItemModel): void {
    this.store.dispatch(OrderActions.addItem({item}));
  }

  removeItem(item: any): void {
    this.store.dispatch(OrderActions.removeItem({item}));
  }

  getOrderQuantityForItem(item: ItemModel): number {
    if (this.order) {
      const itemInOrder = this.order.find(i => i.id === item.id);
      if (itemInOrder) {
        return itemInOrder.quantity;
      }
    }

    return 0;
  }
}
