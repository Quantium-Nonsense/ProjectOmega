import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ItemsByCompanyModel } from '../shared/model/order/items-by-company.model';
import * as fromApp from './../reducers/index';
import { selectItemsByCompany } from './store/order.reducer';

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
