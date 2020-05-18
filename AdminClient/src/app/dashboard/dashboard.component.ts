import { Component, OnInit } from '@angular/core';
import { DashboardLinkModel } from '../models/dasbhboard/dashboard-link.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardItems: DashboardLinkModel[] = [
    {
      title: 'Companies',
      content: 'Click here to see all companies',
      url: '/companies'
    },
    {
      title: 'Users',
      content: 'Click here to see all users',
      url: '/users'
    },
    {
      title: 'Orders',
      content: 'Click here to see all orders',
      url: '/orders'
    },
    {
      title: 'Proudcts',
      content: 'Click here to see all products',
      url: '/products'
    },
    {
      title: 'Customers',
      content: 'Click here to see all customers',
      url: '/customers'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
