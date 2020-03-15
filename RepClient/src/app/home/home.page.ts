import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompanyModel } from '../models/home/company.model';

@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html'
})
export class HomePage {
  private dummyCompanies: Observable<CompanyModel[]>;

  constructor() {
    this.dummyCompanies = new Observable<CompanyModel[]>();
  }

  ionViewWillEnter(): void {
    // Until API is ready create dummy companies with 3s delay
    this.dummyCompanies = of(this.createDummyCompanies()).pipe(delay(3000));
  }

  /**
   * Create a list of 4 dummy companies for placeholders
   */
  private createDummyCompanies = (): CompanyModel[] => {
    const imageUrl = 'assets/shapes.svg';
    const companies: CompanyModel[] = [];

    for (let i = 0; i < 4; i++) {
      companies.push(new CompanyModel(`Company ${i}`, imageUrl, `Some fantastic company called ${i}!`));
    }

    return companies;
  };

}
