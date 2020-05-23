import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CompanyActions from '../company/store/company.actions';
import { State } from '../reducers';
import { SupplierModel } from '../shared/model/home/supplier.model';
import * as HomeActions from './store/home.actions';
import { selectAllCompanies, selectGetCompanyFromName } from './store/home.reducer';

@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html'
})
export class HomePage {
  companies: SupplierModel[];

  private subscriptions: Subscription;

  constructor(private store: Store<State>) {
    this.companies = [];
    this.subscriptions = new Subscription();
  }

  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }

  ionViewWillEnter(): void {

    this.subscriptions.add(this.store.pipe(select(selectAllCompanies)).subscribe(companies => this.companies = companies));
    if (!this.companies) {
      this.store.dispatch(HomeActions.beginLoadingDashboard());
    }
  }

  loadCompaniesItems(name: string): void {
    this.subscriptions.add(this.store.pipe(select(selectGetCompanyFromName, { name })).subscribe(companies => {
      this.store.dispatch(CompanyActions.loadItemsOfCompany({ company: companies[0] }));
    }));
  }
}
