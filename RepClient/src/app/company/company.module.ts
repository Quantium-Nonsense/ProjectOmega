import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPageRoutingModule } from './company-routing.module';

import { CompanyPage } from './company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyPageRoutingModule
  ],
  declarations: [CompanyPage]
})
export class CompanyPageModule {}
