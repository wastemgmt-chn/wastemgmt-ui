import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SellerTypeService } from '../seller-type.service';

@Component({
  selector: 'ngx-seller-type-list',
  templateUrl: './seller-type-list.component.html',
  styleUrls: ['./seller-type-list.component.scss']
})
export class SellerTypeListComponent implements OnInit {
  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name","actions"];
  searchColumns: any[] = [
    { name: "name", canShow: false },

  ];
  definedColumns = ["name"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  sellerTypes: any[] = [];
  filters: any[] = [];
  constructor(private sellerTypeService: SellerTypeService) {}

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
    this.sellerTypeService
      .getSellers(this.postPerPage, this.pageNumber, this.filters)
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

  deleteConfirm = (rowId: any) => {
    this.sellerTypeService.deleteSeller(rowId).subscribe((data: any) => {
      this.loadData();
    });
  };

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };
}
