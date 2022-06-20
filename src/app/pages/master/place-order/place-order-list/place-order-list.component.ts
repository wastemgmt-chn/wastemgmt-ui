import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { OrderCollectionDetailComponent } from '../../order-collection/order-collection-detail/order-collection-detail.component';
import { OrderCollectionService } from '../../order-collection/order-collection.service';
import { PlaceOrderDetailPageComponent } from '../place-order-detail-page/place-order-detail-page.component';
import { PlaceOrderService } from '../place-order.service';

@Component({
  selector: 'ngx-place-order-list',
  templateUrl: './place-order-list.component.html',
  styleUrls: ['./place-order-list.component.scss']
})
export class PlaceOrderListComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();

  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: String [] = ["seller","buyer","latitude","longitude","isCompleted","actions"];
  searchColumns: any[] = [
    { name: "name", canShow: false },

  ];
  definedColumns = ["seller","buyer","latitude","longitude","isCompleted"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  sellerTypes: any[] = [];
  filters: any[] = [];
  eventsSubscription: any;

  constructor(
    private placeOrderService: PlaceOrderService,
    private responseModalService:ResponseModalService) { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }

  loadData = () => {
    this.placeOrderService
      .getOrderCollections(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        this.sellerTypes = datas?.data;
        this.datatrigger.emit(this.sellerTypes);
        this.count = datas?.recordsTotal;
      });
  };
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  detail=(event)=>{
      this.placeOrderService.getOrderCollectionById(event).toPromise().then((data:any[])=>{
        this.responseModalService.openModalRight(PlaceOrderDetailPageComponent,data);
      })


  }


  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };


}
