import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { BidAddComponent } from '../../bid/bid-add/bid-add.component';
import { PlaceOrderService } from '../place-order.service';

@Component({
  selector: 'ngx-place-order-detail-page',
  templateUrl: './place-order-detail-page.component.html',
  styleUrls: ['./place-order-detail-page.component.scss']
})
export class PlaceOrderDetailPageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
 public matdialogRef: MatDialogRef<any>,
 public responseModalService:ResponseModalService,
 private placeOrderService:PlaceOrderService,
 private router:Router
 ) { }

 detailData:any;
 bids:any=[];

 ngOnInit() {
   this.detailData=this.data;
   this.getBids(this.data?.id)
 }

 close(){
   this.matdialogRef.close(true);
  }

 getBids=(id:any)=>{
     this.placeOrderService.getBidsByOrderId(id).toPromise().then((data:any[])=>{
      this.bids=data;
     })

 }

 createBid(detail){
  this.openModal(BidAddComponent, detail);
 }

 openModal = (component: any, data: any) => {
  this.matdialogRef = this.responseModalService.openModalMD(component, data);
  this.matdialogRef.afterClosed().subscribe((res) => {
  });
};

}
