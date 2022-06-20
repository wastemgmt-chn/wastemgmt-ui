import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-place-order-detail-page',
  templateUrl: './place-order-detail-page.component.html',
  styleUrls: ['./place-order-detail-page.component.scss']
})
export class PlaceOrderDetailPageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
 public dialogRef: MatDialogRef<any>) { }

 detailData:any;

 ngOnInit() {
   this.detailData=this.data;
 }

 close(){
   this.dialogRef.close(true);
 }

}
