import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCollectionComponent } from './order-collection.component';
import { OrderCollectionRoutes } from './order-collection.routing';
import { SharedModule } from '../../shared/shared.module';
import { OrderCollectionListComponent } from './order-collection-list/order-collection-list.component';
import { OrderCollectionDetailComponent } from './order-collection-detail/order-collection-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OrderCollectionRoutes,
    SharedModule
  ],
  declarations: [
    OrderCollectionComponent,
    OrderCollectionListComponent,
    OrderCollectionDetailComponent
  ],
})
export class OrderCollectionModule { }
