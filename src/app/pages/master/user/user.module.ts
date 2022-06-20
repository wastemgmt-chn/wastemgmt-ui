import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutes } from './user.routing';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    SharedModule,
  ],
  declarations: [UserComponent,UserListComponent,UserDetailComponent,UserAddComponent]
})
export class UserModule { }
