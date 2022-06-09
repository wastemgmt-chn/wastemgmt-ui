import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class SellerTypeService {
  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getSellerById = (id:string) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getSellerById + id
    );
  };

  saveSeller = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.saveSeller,
      data
    );
  };

  getSellers = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getSellers,
      data
    );
  };

  deleteSeller = (id) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.deleteSeller + id
    );
  };

  getAllSellers = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllSellers
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

}
