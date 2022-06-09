import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../pages/shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    SharedModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
