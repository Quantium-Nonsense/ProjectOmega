import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guads/auth.guard';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // default path
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard]},
  // Add additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
