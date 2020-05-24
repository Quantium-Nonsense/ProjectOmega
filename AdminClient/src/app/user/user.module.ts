import {NgModule} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {SharedModule} from '../shared/shared.module';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		UserComponent,
		EditUserComponent
	],
  imports: [
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class UserModule {
}
