import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidComponent } from './bid.component';
import { BidRoutes } from './bid.routing';
import { BidListComponent } from './bid-list/bid-list.component';
import { BidAddComponent } from './bid-add/bid-add.component';
import { BidDetailComponent } from './bid-detail/bid-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BidRoutes,
    SharedModule
  ],
  declarations: [BidComponent,BidListComponent,BidAddComponent,BidDetailComponent]
})
export class BidModule { }
