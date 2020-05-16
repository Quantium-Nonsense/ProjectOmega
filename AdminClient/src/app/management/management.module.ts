import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {ManagementRoutingModule} from './management-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    ManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ManagementModule {
}
