import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4']; // for each area of the doughnut chart
  public doughnutChartData = [120, 150, 180, 90]; // amount for each area
  public doughnutChartType = 'doughnut';
  data: any[];

  constructor(private chartService: ChartService, labels: string[], chart: number[]) {

  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.chartService.getChartData()
      .subscribe(data => this.data = data);
  }

  getTopProductsData(): void {
    this.chartService.getTopProductsData()
      .subscribe(data => this.data = data);
  }
}
