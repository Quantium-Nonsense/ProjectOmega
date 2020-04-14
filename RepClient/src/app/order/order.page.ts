import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAllCompaniesNames } from '../home/store/home.reducer';
import { ItemsByCompanyModel } from '../shared/model/order/items-by-company.model';
import { OrderItemModel } from '../shared/model/order/order-item.model';
import * as fromApp from './../reducers/index';
import { selectItems, selectItemsByCompany } from './store/order.reducer';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {

  private companyWithItemsInOrder: ItemsByCompanyModel[];
  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
  }

  ionViewWillEnter(): void {
    this.store.select(selectItemsByCompany).subscribe(cItems => this.companyWithItemsInOrder = cItems);
  }

  ionViewWillLeave(): void {
    // clean memory
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
