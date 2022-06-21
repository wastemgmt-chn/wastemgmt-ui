import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
 public dialogRef: MatDialogRef<any>,
 public responseModalService:ResponseModalService,
 private placeOrderService:PlaceOrderService
 ) { }

 detailData:any;
 bids:any=[];

 ngOnInit() {
   this.detailData=this.data;
   this.getBids(this.data?.id)
 }

 close(){
   this.dialogRef.close(true);
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
  this.dialogRef = this.responseModalService.openModalMD(component, data);
  this.dialogRef.afterClosed().subscribe((res) => {
  });
};

}
