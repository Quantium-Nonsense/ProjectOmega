import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { beginLoadingDashboard } from '../home/store/home.actions';
import { selectAllCompanies } from '../home/store/home.reducer';
import { SupplierModel } from '../shared/model/home/supplier.model';
import { ClientModel } from '../shared/model/order/clientModel';
import { ItemsByCompanyModel } from '../shared/model/order/items-by-company.model';
import { OrderProductModel } from '../shared/model/order/oder-product.model';
import * as CompanyActions from './../company/store/company.actions';
import * as fromApp from './../reducers/index';
import { createNewOrder, loadAllClients } from './store/order.actions';
import { selectAllClients, selectItemsByCompany } from './store/order.reducer';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {

  companyWithItemsInOrder: ItemsByCompanyModel[];
  subscription: Subscription;
  companies: SupplierModel[];
  clients: ClientModel[];
  selectedClient: ClientModel;

  constructor(
      private store: Store<fromApp.State>
  ) {
    this.subscription = new Subscription();
  }

  ionViewWillEnter(): void {
    this.store.dispatch(beginLoadingDashboard());
    this.store.dispatch(loadAllClients());
    this.subscription.add(
        this.store.pipe(select(selectAllClients)).subscribe(clients => {
          this.clients = clients;
          if (clients) {
            this.selectedClient = clients[0];
          }
        })
    );
    this.subscription.add(
        this.store.pipe(select(selectAllCompanies)).subscribe(companies => this.companies = companies)
    );
    this.subscription.add(
        this.store.pipe(select(selectItemsByCompany)).subscribe(items => this.companyWithItemsInOrder = items)
    );

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

  compareWithFn = (o1, o2) =>
      o1?.id === o2?.id ?? false;

  completeOrder(): void {
    const order: OrderProductModel[] = [];
    this.companyWithItemsInOrder.forEach(c => {
      c.companyItems.forEach(product => {
        order.push({
          client: this.selectedClient,
          product,
          quantity: product.quantity
        });
      });
    });
    this.store.dispatch(createNewOrder({ order }));
  }
}
