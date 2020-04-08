import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  // TODO Update routes
  // {
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  //   path: 'home'
  // },
  // {
  //   loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
  //   path: 'list'
  // },
  {
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule),
    path: 'auth'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ]
})
export class AppRoutingModule {
}
