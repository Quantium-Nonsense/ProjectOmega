import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { beginLoadingDashboard } from '../home/store/home.actions';
import { selectAllCompanies } from '../home/store/home.reducer';
import { getSessionID } from '../session-id';
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
    private store: Store<fromApp.State>,
    private logger: NGXLogger
  ) {
    this.subscription = new Subscription();
    this.logger.info(`Session ID: ${getSessionID()} - Constructing Order page`);

  }

  ionViewWillEnter(): void {
    this.store.dispatch(beginLoadingDashboard());
    this.store.dispatch(loadAllClients());
    this.subscription.add(
      this.store.pipe(select(selectAllClients)).subscribe(clients => {
        this.clients = clients;
        if (clients) {
          this.logger.info(`Session ID: ${getSessionID()} - Clients loaded`);
          this.selectedClient = clients[0];
        }
      })
    );
    this.subscription.add(
      this.store.pipe(select(selectAllCompanies)).subscribe(companies => {
        this.companies = companies;
        this.logger.info(`Session ID: ${getSessionID()} - Companies loaded`);
      })
    );
    this.subscription.add(
      this.store.pipe(select(selectItemsByCompany)).subscribe(items => {
        this.companyWithItemsInOrder = items;
        this.logger.info(`Session ID: ${getSessionID()} - Products loaded`);
      })
    );

  }

  ionViewWillLeave(): void {
    // clean memory
    this.subscription.unsubscribe();
    this.logger.info(`Session ID: ${getSessionID()} - Leaving Order page`);
  }

  ngOnInit(): void {
    //
  }

  /**
   * This is to add an item in the order
   */
  addItem(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Adding a new item`);
    this.store.dispatch(CompanyActions.showCompaniesBottomSheet({
      data: {
        action: (selectedCompany: SupplierModel) => {
          this.store.dispatch(CompanyActions.loadItemsOfCompany({company: selectedCompany}));
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
    this.logger.info(`Session ID: ${getSessionID()} - Submitting order`);
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
    this.store.dispatch(createNewOrder({order}));
  }
}
