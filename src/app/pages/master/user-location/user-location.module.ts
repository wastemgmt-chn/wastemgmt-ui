import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationComponent } from './user-location.component';
import { UserLocationRoutes } from './user-location.routing';


@NgModule({
  imports: [
    CommonModule,
    UserLocationRoutes,
  ],
  declarations: [
    UserLocationComponent,
  ]
})
export class UserLocationModule { }
