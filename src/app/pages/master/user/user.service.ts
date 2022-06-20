import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../shared/AppConfiguration';
import { CommonHttpClientService } from '../../shared/commonHttpService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private commonHttpClientService: CommonHttpClientService,
    private appConfiguration: AppConfiguration
  ) {}

  getUserById = (id:string) => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getUserById + id
    );
  };


  getUsers = (postPerPage: any, pageNumber: number, filter: any[]) => {
    let data = {
      draw: this.randomNumber(),
      filter: filter,
      pageNo: pageNumber,
      pageSize: postPerPage,
    };
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.getUsers,
      data
    );
  };


  getAllUsers = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllUsers
    );
  };

  getAllUserAddress= () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getAllUserAddress
    );
  };

  deleteUserAddress=(id)=>{
   return this.commonHttpClientService.httpGet(this.appConfiguration.deleteUserAddress+id)
  }


  getUserCount = () => {
    return this.commonHttpClientService.httpGet(
      this.appConfiguration.getUserCount
    );
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100 + 1);
  };

  saveUser = (data) => {
    return this.commonHttpClientService.httpPost(
      this.appConfiguration.saveUser,
      data
    );
  };

  getRoles(){
    return this.commonHttpClientService.httpGet(this.appConfiguration.getRoles);
  }


}
