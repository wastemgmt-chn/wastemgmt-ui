import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { SubCategoryAddComponent } from './sub-category/sub-category-add/sub-category-add.component';
import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutes,
    SharedModule
  ],
  declarations: [
    CategoryComponent,
    SubCategoryAddComponent,
    SubCategoryListComponent,
    ProductAddComponent,
    ProductListComponent]
})
export class CategoryModule { }
