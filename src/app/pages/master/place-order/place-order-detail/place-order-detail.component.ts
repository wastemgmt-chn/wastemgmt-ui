import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ngx-place-order-detail',
  templateUrl: './place-order-detail.component.html',
  styleUrls: ['./place-order-detail.component.scss']
})
export class PlaceOrderDetailComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  filters: any[] = [];
  @Input() data: any[];
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["product", "weight", "amount","comment", "actions"];
  definedColumns = ["product", "weight", "amount","comment",];
  searchColumns: any[] = [];
  postPerPage: number = 10;
  pageNumber: number = 1;
  rows = new MatTableDataSource([]);
  count: number = 0;
  constructor() {}
  ngOnInit(): void {
    this.rows.data=this.data;
  }
  reload = (data: any[]) => {
    this.rows.data=this.data;
    this.datatrigger.emit(data);
  };
  deleteConfirm=(rowId:any)=>{
    this.deleteRow.emit(rowId);
  }
  edit=(rowId:any)=>{
    this.editFromList.emit(rowId);
  }
}
