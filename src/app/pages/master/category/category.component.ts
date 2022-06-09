import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CategoryHeadingEnum } from '../../shared/common.enum';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { CategoryService } from './category.service';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { SubCategoryAddComponent } from './sub-category/sub-category-add/sub-category-add.component';

@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  subCategoryReloadEvent: Subject<void> = new Subject<void>();
  productReloadEvent: Subject<void> = new Subject<void>();
  subCategoryCount: any;
  productCount: any;
  filters: any[] = [];

  //Form
  editData: any = {};             //Send edit data to add component

  //Page Header
  title: string;                  //To set the title for page header
  buttonText: string;             //To set the add button text for page header

  //Tab
  headings: any[] = [];           //To get the header from enum for Tab
  selectedTab: any;               //To get the selected tab by index
  matDialogRef: MatDialogRef<any>;

  constructor(private responseModalService: ResponseModalService,
    private categoryService: CategoryService) {
      this.headings = Object["values"](CategoryHeadingEnum);
     }

  ngOnInit(): void {
    // this.getCarCount();
    this.selectedTab = this.headings[0];
  }

  headerTextChanging = (data: any)=>{
    this.selectedTab = data.tabTitle;
    this.title = data?.tabTitle;
    this.buttonText = "Add " + data?.tabTitle;
  }

  add = () => {
    let data = { "title": "Add " + this.selectedTab };
    if (this.selectedTab == this.headings[0]) {
      this.openModal(SubCategoryAddComponent, data);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(ProductAddComponent, data);
    }
  }
  cancel = (isPanelOpen) => {
  }
  onsaveComplete = (event) => {
    this.emitEventToReload();
  }
  search = (text) => {
    this.subCategoryReloadEvent.next(text);
  }

  emitEventToReload = () =>  {
    if (this.selectedTab == this.headings[0]) {
      this.subCategoryReloadEvent.next(null);
    }
    else if (this.selectedTab == this.headings[1]) {
      this.productReloadEvent.next();
    }
  }
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit " + this.selectedTab;
    if (this.selectedTab == this.headings[0]) {
      this.openModal(SubCategoryAddComponent, this.editData);
    }
    if (this.selectedTab == this.headings[1]) {
      this.openModal(ProductAddComponent, this.editData);
    }
  }
  getSubCategoryCount=(event)=>{
     this.subCategoryCount=event;
  }
  getProductCount=(event)=>{
    this.productCount=event;
  }

  delete=(event:any)=>{
    // this.getCarCount();
  }
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(res => {
      this.emitEventToReload();
      // this.getCarCount();
    });
  }
  // getCarCount = () => {
  //   this.carService.getCarCount().subscribe((data: any) => {
  //     this.brandCount = data?.brand;
  //     this.varientCount =  data?.varient;
  //   });
  // };

}
