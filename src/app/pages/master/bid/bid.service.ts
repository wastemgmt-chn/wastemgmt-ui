import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class BidService {

constructor(private commonHttpClientService:CommonHttpClientService,private appConfiguration:AppConfiguration) { }

getBids = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.getBids,
    data
  );
};

randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

getBidById = (id:string) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getBidById + id
  );
};

saveBid = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.saveBid,
    data
  );
};


}
