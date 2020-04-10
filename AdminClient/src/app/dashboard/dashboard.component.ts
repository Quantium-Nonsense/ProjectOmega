import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardItems = ['Products, Customers, Orders, Users, Settings']

  constructor() { }

  ngOnInit(): void {
  }

}
