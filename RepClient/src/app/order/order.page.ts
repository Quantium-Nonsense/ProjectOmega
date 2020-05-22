import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCompaniesNames } from '../home/store/home.reducer';
import { ItemsByCompanyModel } from '../shared/model/order/items-by-company.model';
import * as CompanyActions from './../company/store/company.actions';
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
  private allCompaniesNames: string[];

  constructor(
      private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
  }

  ionViewWillEnter(): void {
    this.subscription.add(this.store.select(selectItemsByCompany).subscribe(cItems => this.companyWithItemsInOrder = cItems));
    this.subscription.add(this.store.select(selectAllCompaniesNames).subscribe(names => this.allCompaniesNames = names));
  }

  ionViewWillLeave(): void {
    // clean memory
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //
  }

  /**
   * This is to add an item in the order
   */
  addItem(): void {
    this.store.dispatch(CompanyActions.showCompaniesBottomSheet({
      data: {
        action: (selectedCompany: string) => {
          this.store.dispatch(CompanyActions.companySelected({ selectedCompany: null }));
        },
        listLabels: [
          ...this.allCompaniesNames
        ]
      }

    }));
  }
}
