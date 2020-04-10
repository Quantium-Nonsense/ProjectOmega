import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ListDisplayDataModel } from '../shared/component/list-display-bottom-sheet/model/list-display-data.model';
import { ListLoaderComponent } from '../shared/component/list-loader/list-loader.component';
import { SortOptionsEnum } from '../shared/model/sort-options.enum';
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

  readonly ASCENDING: SortOptionsEnum = SortOptionsEnum.ASCENDING;
  readonly DESCENDING: SortOptionsEnum = SortOptionsEnum.DESCENDING;

  /**
   * Holds all items of said company
   */
  items: ItemModel[] = [];
  /**
   * Company name to display at top of nav bar
   */
  currentCompany = '';

  private state$ = this.store.select('company');
  private subscription: Subscription = new Subscription();
  private isBottomSheetVisible: boolean;

  constructor(
    private bottomSheet: MatBottomSheet,
    public store: Store<fromApp.AppState>
  ) {

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
        this.isBottomSheetVisible = s.showCompaniesBottomSheet;
        this.store.dispatch(CompanyActions.loadItemsOfCompany({company: s.company}));
      });
    this.subscription.add(
      this.state$.subscribe(
        (currentState: fromCompany.State) => {
          this.items = currentState.companyItems;
          this.shouldBottomSheetShow(currentState.showCompaniesBottomSheet);
        }
      )
    );
  }

  ionViewWillLeave(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Fires a sortItems action via the store and triggers the store to sort the items by sortBy
   * @param sortBy How to sort the list
   */
  sortBy(sortBy: SortOptionsEnum): void {
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

  changeCompanyButtonClick(): void {
    this.store.dispatch(CompanyActions.triggerCompaniesBottomSheet({display: !this.isBottomSheetVisible}));
  }

  private shouldBottomSheetShow(showCompaniesBottomSheet: boolean): void {
    if (showCompaniesBottomSheet) {
      this.store.select('home').pipe(take(1)).subscribe(lastState => {
        this.bottomSheet.open(ListLoaderComponent, {
          data: {
            action: (selectedCompany: string) => {
              this.store.dispatch(CompanyActions.companySelected({selectedCompany}));
            },
            listLabels: [
              ...lastState.companies
            ]
          } as ListDisplayDataModel
        });
      });
    }
  }
}
