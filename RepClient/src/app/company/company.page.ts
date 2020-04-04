import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SortOptions } from '../shared/model/sort-options';
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

  readonly ASCENDING: SortOptions = SortOptions.ASCENDING;
  readonly DESCENDING: SortOptions = SortOptions.DESCENDING;

  /**
   * Holds all items of said company
   */
  items: ItemModel[] = [];
  /**
   * List of 10 items for loading indicator
   * Just needs a set length
   */
  dummyItems = [];
  /**
   * Company name to display at top of nav bar
   */
  currentCompany = '';
  private state$ = this.store.select('company');
  private subscription: Subscription = new Subscription();

  constructor(
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
      .subscribe(s => {
        this.currentCompany = s.company;
        this.store.dispatch(CompanyActions.loadItemsOfCompany({company: s.company}));
      });
    this.subscription.add(this.state$.subscribe((currentState: fromCompany.State) => {
      this.items = currentState.companyItems;
    }));
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
  }

  sortBy(sortBy: SortOptions): void {
    this.store.dispatch(CompanyActions.sortItems({by: sortBy, items: this.items}));
  }
}
