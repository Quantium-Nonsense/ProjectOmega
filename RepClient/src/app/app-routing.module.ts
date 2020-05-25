import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    path: 'home'
  },
  {
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
    path: 'auth'
  },
  {
    loadChildren: () => import('./company/company.module').then(m => m.CompanyPageModule),
    path: 'company'
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
  }, {
    path: 'customer',
    loadChildren: () => import('./add-customer/add-customer.module').then(m => m.AddCustomerPageModule)
  }

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ]
})
export class AppRoutingModule {
}
