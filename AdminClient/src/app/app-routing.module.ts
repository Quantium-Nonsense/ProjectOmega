import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guads/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // default path
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard]},
  {path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard]},
  {path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // Add additional routes here as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
