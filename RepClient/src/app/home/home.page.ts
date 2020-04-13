import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { State } from '../reducers';
import { CompanyModel } from '../shared/model/home/company.model';
import * as CompanyActions from './../company/store/company.actions';
import * as HomeActions from './store/home.actions';

@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html'
})
export class HomePage {
  companies: CompanyModel[];

  private subscriptions: Subscription;

  constructor(private store: Store<State>) {
    this.companies = [];
    this.subscriptions = new Subscription();
  }

  ionViewWillEnter(): void {
    const homeState$ = this.store.select('home');
    this.subscriptions.add(
      homeState$.subscribe(state => {
        this.companies = state.companies;
      })
    );

    if (!this.companies) {
      this.store.dispatch(HomeActions.beginLoadingDashboard());
    }
  }

  loadCompaniesItems(name: string): void {
    // this.store.dispatch(HomeActions.dashboardCleanUp());
    this.store.dispatch(CompanyActions.companySelected({selectedCompany: name}));
  }
}
