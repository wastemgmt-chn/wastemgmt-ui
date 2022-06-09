import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerTypeComponent } from './seller-type.component';
import { SharedModule } from '../../shared/shared.module';
import { SellerRoutes } from './seller.routing';
import { SellerTypeAddComponent } from './seller-type-add/seller-type-add.component';
import { SellerTypeListComponent } from './seller-type-list/seller-type-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SellerRoutes
  ],
  declarations: [
    SellerTypeComponent,
    SellerTypeAddComponent,
    SellerTypeListComponent]
})
export class SellerTypeModule { }
