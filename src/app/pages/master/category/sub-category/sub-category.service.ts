import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getSubCategoryById = (id:string) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getSubCategoryById + id
    );
  };

  saveSubCategory = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.saveSubCategory,
      data
    );
  };

  getSubCategories = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getSubCategories,
      data
    );
  };

  deleteSubCategory = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteSubCategoryById + id
    );
  };

  getAllSubCategories = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllSubCategories
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };
}
