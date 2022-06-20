import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { SellerTypeService } from '../../seller-type/seller-type.service';
import { BidService } from '../bid.service';

@Component({
  selector: 'ngx-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.scss']
})
export class BidListComponent implements OnInit {
  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["buyer","seller","weight","amount","actions"];
  searchColumns: any[] = [


  ];
  definedColumns = ["buyer","seller","weight","amount"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  bids: any[] = [];
  filters: any[] = [];
  constructor(private bidService: BidService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }

  loadData = () => {
    this.bidService
      .getBids(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        this.bids = datas?.data;
        this.datatrigger.emit(this.bids);
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

  deleteConfirm = (rowId: any) => {
    // this.sellerTypeService.deleteSeller(rowId).subscribe((data: any) => {
    //   this.loadData();
    // });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}
