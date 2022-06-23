import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { BidAddComponent } from '../../bid/bid-add/bid-add.component';
import { PlaceOrderService } from '../place-order.service';

@Component({
  selector: 'ngx-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailPageComponent implements OnInit {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Bids>>;
  dataSource: MatTableDataSource<Order>;
  ordersData: Order[] = [];
  columnsToDisplay = ['product', 'weight', 'amount', 'addBid'];
  innerDisplayedColumns = ['buyer', 'seller', 'weight','amount'];
  expandedElement: Order | null;
  ORDERS: Order[] = [];
  bids=[
    {
      buyer:"dinesh" ,
      seller:"hari" ,
      weight: 23,
      amount:23
    },
    {
      buyer:"dinesh" ,
      seller:"hari" ,
      weight: 23,
      amount:23
    }
  ]


  constructor(
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matdialogRef: MatDialogRef<any>,
    public responseModalService: ResponseModalService,
    private placeOrderService: PlaceOrderService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.data.orderCollectionDetail.forEach((e: any) => {
    let barray:any=[];
    barray=this.getBidArray(e.id);
    console.log( barray);
    let obj: any = {
      id: e.id,
      detailData: e,
      product: e.product,
      weight: e.weight,
      amount: e.amount,
      bids: barray
    }
    this.ORDERS.push(obj)
    })
    this.ORDERS.forEach(order => {
      if (order.bids && Array.isArray(order.bids)) {
        this.ordersData = [...this.ordersData, { ...order, bids: new MatTableDataSource(order.bids) }];
      } else {
        this.ordersData = [...this.ordersData, order];
      }
    });
    this.dataSource = new MatTableDataSource(this.ordersData);
    this.dataSource.sort = this.sort;
  }

  createBid(detail) {
    this.openModal(BidAddComponent, detail);
  }

   getBidArray(id){
    let barr:any=[];
    this.placeOrderService.getBidsByOrderId(id).toPromise().then((data: any[]) => {
      if(data!=null){
        data.forEach((e:any)=>{
          if(e!=null){
             let obj={
              id:e.id,
              buyer:e.buyer?.name,
              seller:e.seller?.name,
              weight:e.weight,
              amount:e.amount
             }
             barr.push(obj)
          }
        })
      }
    })
   return barr;
  }
  openModal = (component: any, data: any) => {
    this.matdialogRef = this.responseModalService.openModalSM(component, data);
    this.matdialogRef.afterClosed().subscribe((res) => {
    });
  };

  toggleRow(element: Order) {
    element.bids && (element.bids as MatTableDataSource<Bids>).data?.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Bids>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Bids>).filter = filterValue.trim().toLowerCase());
  }

  close() {
    this.matDialog.closeAll();
  }

}

export interface Order {
  id:string;
  product: string;
  weight: string;
  amount: string;
  bids?: Bids[] | MatTableDataSource<Bids>;
}

export interface Bids {
  id:string;
  buyer: string;
  seller: string;
  weight: string;
  amount:string;
}

export interface OrderDataSource {
  id:string;
  product: string;
  weight: string;
  amount: string;
  bids?: MatTableDataSource<Bids>;
}



