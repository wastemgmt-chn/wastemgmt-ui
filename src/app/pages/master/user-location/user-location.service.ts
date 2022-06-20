import { Injectable } from '@angular/core';
import { AppConfiguration } from '../../shared/AppConfiguration';
import { OrderCollectionService } from '../order-collection/order-collection.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

constructor(
private userSE: OrderCollectionService,
private appconfiguration: AppConfiguration
) { }

}
