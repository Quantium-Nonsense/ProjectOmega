import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as CompanyActions from '../company/store/company.actions';
import * as fromCompany from '../company/store/company.reducer';
import { ItemModel } from '../shared/model/company-items/item.model';
import { SupplierModel } from '../shared/model/home/supplier.model';
import { OrderItemModel } from '../shared/model/order/order-item.model';
import { SortOptionsEnum } from '../shared/model/sort-options.enum';
import * as OrderActions from './../order/store/order.actions';
import * as fromApp from './../reducers/index';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss']
})
export class CompanyPage implements OnInit {

  readonly ASCENDING: SortOptionsEnum = SortOptionsEnum.ASCENDING;
  readonly DESCENDING: SortOptionsEnum = SortOptionsEnum.DESCENDING;

  /**
   * Holds all items of said company
   */
  items: ItemModel[] = [];
  /**
   * Company name to display at top of nav bar
   */
  currentCompany: SupplierModel = null;

  /**
   * Hold the orders to display quantity
   */
  order: OrderItemModel[] = [];

  private state$ = this.store.select('company');
  private subscription: Subscription = new Subscription();
  private isBottomSheetVisible: boolean;

  constructor(
      public store: Store<fromApp.State>
  ) {

  }

  ngOnInit(): void {
    //
  }

  ionViewWillEnter(): void {
    this.subscription.add(
        this.store.select('order').subscribe(orderState => {
          this.order = orderState.items;
        })
    );

    this.subscription.add(this.store.pipe(select(fromCompany.selectAllItems)).subscribe(prods => this.items = prods));
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(CompanyActions.cleanup());
  }

  /**
   * Fires a sortItems action via the store and triggers the store to sort the items by sortBy
   * @param sortBy How to sort the list
   */
  sortBy(sortBy: SortOptionsEnum): void {
    this.store.dispatch(CompanyActions.sortItems({ by: sortBy, items: this.items }));
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

  quickShowAllCompanies(): void {
    this.store.select('home').pipe(take(1)).subscribe(lastState => {
      this.store.dispatch(CompanyActions.showCompaniesBottomSheet({
            data: {
              action: (selectedCompany: SupplierModel) => {
                this.store.dispatch(CompanyActions.loadItemsOfCompany({ company: selectedCompany }));
              },
              companies: lastState.companies
            }
          }
      ));
    });
  }

  itemsExist(): boolean {
    return !!this.items;
  }

  showItemsInBasket(): boolean {
    if (this.order) {
      return this.order.some(i => i.quantity > 0);
    }

    return false;
  }
}
