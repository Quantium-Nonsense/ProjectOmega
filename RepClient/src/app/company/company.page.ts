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

  /**
   * Fires a sortItems action via the store and triggers the store to sort the items by sortBy
   * @param sortBy How to sort the list
   */
  sortBy(sortBy: SortOptions): void {
    this.store.dispatch(CompanyActions.sortItems({by: sortBy, items: this.items}));
  }

  /**
   * Checks if any items description or name contains the values used in search bar
   * Simply visual without updating app State so this is not done via store effects
   * This allows to avoid an extra http call to get the items from the backend again,
   * instead using the value already stored in the app state
   * @param value The values to search for in the items
   */
  itemLookup(value: string): void {
    if (!value) {
      // If value is an empty string reset array
      this.cancelLookup();
    }
    this.items = [...this.items.filter(item => {
      if (
        item.description.toLocaleUpperCase().includes(value.toLocaleUpperCase()) ||
        item.name.toLocaleUpperCase().includes(value.toLocaleUpperCase())) {
        return item;
      }
    })];
  }

  /**
   * Reset item list to the original state stored in store
   */
  cancelLookup(): void {
    // Take 1 forces ngrx store to return current value synchronously
    this.state$.pipe(take(1)).subscribe(state => this.items = state.companyItems);
  }
}
