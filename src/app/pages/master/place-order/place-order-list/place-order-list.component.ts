import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { UserService } from '../../user/user.service';
import { DetailPageComponent } from '../detail-page/detail-page.component';
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
    { name: "seller.name", canShow: true },
    { name: "buyer.name", canShow: false },
    { name: "latitude", canShow: true },

  ];
  definedColumns = ["seller","buyer","latitude","longitude","isCompleted"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  sellerTypes: any[] = [];
  filters: any[] = [];
  eventsSubscription: any;
  filterForm:FormGroup;
  sellers:any=[];
  buyers:any=[];

  selectedSeller={};
  selectedBuyer={};



  constructor(
    private placeOrderService: PlaceOrderService,
    private responseModalService:ResponseModalService,
    private fb:FormBuilder,
    private userService:UserService,
    public datepipe: DatePipe
    ) { }

  ngOnInit() {
  this.getSellers();
      this.filterForm = this.fb.group({
        fromDate: [""],
        toDate: [""],
        seller:[""],
        buyer:[""]
      });

    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }
  getSellers=()=>{
    this.userService.getAllUsers().toPromise().then((data:any[])=>{
     const sellers=data.filter((obj) => {
       return obj.userType === "seller";
     });
     const buyers=data.filter((obj) => {
      return obj.userType === "buyer";
      });
     this.sellers=sellers;
     this.buyers=buyers;
    });
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
        this.responseModalService.openModalRight(DetailPageComponent,data);
      })
  }

  reset(){
    this.filterForm.patchValue({
      fromDate:null,
      toDate:null,
    })
    this.selectedBuyer={};
    this.selectedSeller={};
    this.filters=[];
    this.loadData();
  }

  focus(event){
    alert("hai")
  }


  onSearch = (filters: any[]) => {
    this.filters = filters;
    console.log(filters);
     this.loadData();
  };

  getFilteredData=(data)=>{
    // alert(JSON.stringify(data));
    const filter = [{
      key: data.key,
      operation: ":",
      orPredicate: false,
      value: data.val,
    }];
   this.filters= filter;
   this.loadData();
  }

  getFilter(){
    this.filterForm.patchValue({
      seller:this.selectedSeller,
      buyer:this.selectedBuyer
    })
   let data = this.filterForm.value;
  data.toDate = this.datepipe.transform(
    this.filterForm?.value?.toDate,
    "MM/dd/yyyy"
  );
   console.log(data)

   let buyer={
    key:"latitude",
    operation:':',
    orPredicate: false,
    value:13
   }
   let seller={
    key:"seller.name",
    operation:':',
    orPredicate: false,
    value:data.seller.name
   }
const filter = [];
filter.push(buyer);
filter.push(seller)
 this.filters= filter;
 this.loadData();

  }
}
