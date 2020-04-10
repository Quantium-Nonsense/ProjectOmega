import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // default path
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent}
  { path: 'auth', component: AuthPage}
  // Add additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
