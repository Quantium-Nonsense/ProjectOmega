import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full'}, // default path
  { path: 'customers', component: CustomersComponent}
  // Add additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
