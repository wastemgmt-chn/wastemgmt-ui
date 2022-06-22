import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceOrderComponent } from './place-order.component';
import { PlaceOrderRoutes } from './place-order.routing';
import { PlaceOrderListComponent } from './place-order-list/place-order-list.component';
import { PlaceOrderAddComponent } from './place-order-add/place-order-add.component';
import { SharedModule } from '../../shared/shared.module';
import { PlaceOrderDetailComponent } from './place-order-detail/place-order-detail.component';
import { PlaceOrderDetailPageComponent } from './place-order-detail-page/place-order-detail-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';


@NgModule({
  imports: [
    CommonModule,
    PlaceOrderRoutes,
    SharedModule,
  ],
  declarations: [
    PlaceOrderComponent,
    PlaceOrderListComponent,
    PlaceOrderAddComponent,
    PlaceOrderDetailComponent,
    PlaceOrderDetailPageComponent,
    DetailPageComponent
  ]
})
export class PlaceOrderModule { }
