import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  @Output() countValue=new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["name","Sub Category Name","actions"];
  definedColumns = ["name","subCategory"];
  searchColumns: any[] = [{ name: "name", canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  products: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData();
  }
  loadData = () => {
    this.productService.getProducts(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        console.log(datas)
        this.products = datas?.data;
        this.datatrigger.emit(this.products);
        this.count = datas?.recordsTotal;
        this.countValue.emit(this.count);
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
  deleteConfirm = (id) => {
    this.productService.deleteProduct(id).subscribe((data: any) => {
      this.deleteFromList.emit(id);
      this.loadData();
    });
  };
  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };

}
