import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-order-collection-detail',
  templateUrl: './order-collection-detail.component.html',
  styleUrls: ['./order-collection-detail.component.scss']
})
export class OrderCollectionDetailComponent implements OnInit {

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
