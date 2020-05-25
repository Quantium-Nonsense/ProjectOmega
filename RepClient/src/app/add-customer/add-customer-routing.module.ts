import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomerPage } from './add-customer.page';

const routes: Routes = [
  {
    component: AddCustomerPage,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCustomerPageRoutingModule {}
