import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SubCategoryService } from '../sub-category.service';

@Component({
  selector: 'ngx-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  filters: any[] = [];
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() deleteFromList = new EventEmitter();
  @Output()  countValue =new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["name", "actions"];
  definedColumns = ["name"];
  searchColumns: any[] = [{ name: "name", canShow: true }];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  subCategories: any[] = [];
  constructor(private subCategoryService: SubCategoryService) {}
  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(() => {
      this.loadData();
    });
    this.loadData();
  }
  loadData = () => {
    this.subCategoryService.getSubCategories(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        console.log(datas)
        this.subCategories = datas?.data;
        this.datatrigger.emit(this.subCategories);
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
    this.subCategoryService.deleteSubCategory(id).subscribe((data: any) => {
      this.deleteFromList.emit(id);
      this.loadData();
    });
  };
  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };
}
