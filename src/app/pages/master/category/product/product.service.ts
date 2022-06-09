import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getProductById = (id:string) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getProductById + id
    );
  };

  saveProduct = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.saveProduct,
      data
    );
  };

  getProducts = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getProducts,
      data
    );
  };

  deleteProduct = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteProductById + id
    );
  };

  getAllProducts = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllProducts
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

}
