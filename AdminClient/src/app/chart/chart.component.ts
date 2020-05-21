import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4']; // for each area of the doughnut chart
  public doughnutChartData = [120, 150, 180, 90]; // amount for each area
  public doughnutChartType = 'doughnut';
  constructor() { }
  ngOnInit() {
  }
}
