import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ManagementRoutingModule} from './management-routing.module';
import { ManagementDialogComponent } from './management-dialog/management-dialog.component';

@NgModule({
  declarations: [
  ManagementDialogComponent],
  imports: [
    ManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManagementModule {

}
