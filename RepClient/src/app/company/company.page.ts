import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe, Subscription } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import * as fromApp from './../reducers/index';
import { ItemModel } from './model/item.model';
import * as CompanyActions from './store/company.actions';
import * as fromCompany from './store/company.reducer';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss']
})
export class CompanyPage implements OnInit {

  items: ItemModel[] = [];
  dummyItems = []; // Create a list of 10 items for loading indicator
  private state$ = this.store.select('company');
  private subscription: Subscription = new Subscription();

  constructor(
    public activatedRoute: ActivatedRoute,
    public store: Store<fromApp.AppState>
  ) {
    for (let i = 0; i < 10; i++) {
      this.dummyItems.push(i);
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.store.select('company')
      .pipe(
        // Force to run synchronously as company is already loaded from dashboard
        take(1)
      )
      .subscribe(s => this.store.dispatch(CompanyActions.loadItemsOfCompany({company: s.company})));
    this.subscription.add(this.state$.subscribe((currentState: fromCompany.State) => {

    }));
  }

}
