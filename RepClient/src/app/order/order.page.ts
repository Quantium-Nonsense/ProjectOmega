import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllCompanies, selectAllCompaniesNames } from '../home/store/home.reducer';
import { SupplierModel } from '../shared/model/home/supplier.model';
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
  private companies: SupplierModel[];

  constructor(
      private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
  }

  ionViewWillEnter(): void {
    this.subscription.add(this.store.select(selectItemsByCompany).subscribe(cItems => {
      return this.companyWithItemsInOrder = cItems;
    }));
    this.subscription.add(this.store.select(selectAllCompanies).subscribe(companies => this.companies = companies));
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
        action: (selectedCompany: SupplierModel) => {
          this.store.dispatch(CompanyActions.loadItemsOfCompany({ company: selectedCompany }));
        },
        companies: [
          ...this.companies
        ]
      }

    }));
  }
}
