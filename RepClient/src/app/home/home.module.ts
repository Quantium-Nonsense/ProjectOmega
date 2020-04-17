import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        component: HomePage,
        path: ''
      }
    ])
  ]
})
export class HomePageModule {
}
