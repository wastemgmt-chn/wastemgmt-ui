import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

constructor(private commonHttpClientService:CommonHttpClientService,private appConfiguration:AppConfiguration) { }


getOrderCollections = (postPerPage: any, pageNumber: number, filter: any[]) => {
  let data = {
    draw: this.randomNumber(),
    filter: filter,
    pageNo: pageNumber,
    pageSize: postPerPage,
  };
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.getOrderCollections,
    data
  );
};
getOrderCollectionById = (id:string) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getOrderCollectionById + id
  );
};

getTransactionStatus=()=>{
  return this.commonHttpClientService.httpGet(this.appConfiguration.getTransactionStatus);
}

randomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

saveOrderCollection = (data) => {
  return this.commonHttpClientService.httpPost(
    this.appConfiguration.saveOrderCollection,
    data
  );
};

getBidsByOrderId = (id:string) => {
  return this.commonHttpClientService.httpGet(
    this.appConfiguration.getBidById + id
  );
};


}
