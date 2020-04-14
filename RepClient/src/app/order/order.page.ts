import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectAllCompaniesNames } from '../home/store/home.reducer';
import { OrderItemModel } from '../shared/model/order/order-item.model';
import * as fromApp from './../reducers/index';
import { selectItems, selectItemsByCompany } from './store/order.reducer';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {

  private weirdObject: { companyNames: string[], items: [OrderItemModel[]] };
  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
  }

  ionViewWillEnter(): void {
    this.store.select(selectItemsByCompany).subscribe(w => this.weirdObject = w);
  }

  ionViewWillLeave(): void {
    // clean memory
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
