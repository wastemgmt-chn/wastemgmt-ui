import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Dropdown } from '../../shared/dynamic-forms/dropdown';
import { DynamicFormBase } from '../../shared/dynamic-forms/dynamic-form-base';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { PlaceOrderAddComponent } from './place-order-add/place-order-add.component';

@Component({
  selector: 'ngx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  orderReloadEvent: Subject<void> = new Subject<void>();
  cardArray: any[] = [];
  title: string = "Order";
  buttonText: string = "Add Order";
  editData: any = {};
  constructor(private responseModalService: ResponseModalService,private router:Router) {}
  ngOnInit(): void {}
  add = () => {
    this.router.navigate(["pages/master/place-order/add"]);
  };
  emitEventToReload = () => {
    this.orderReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.router.navigate(["pages/master/place-order/edit/"+rowId])
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.orderReloadEvent.next(text);
  };



}
