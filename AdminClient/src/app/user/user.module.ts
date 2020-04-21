import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent,
    EditUserComponent,
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
