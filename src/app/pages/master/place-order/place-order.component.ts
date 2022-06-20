import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { PlaceOrderAddComponent } from './place-order-add/place-order-add.component';

@Component({
  selector: 'ngx-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  orderReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Order";            //To set the title for page header
  buttonText: string = "Add Order";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService,private router:Router) {}
  ngOnInit(): void {}
  add = () => {
    this.router.navigate(["pages/master/place-order/add"]);

    // let data = { title: this.buttonText };
    // this.openModal(PlaceOrderAddComponent, data);
  };
  emitEventToReload = () => {
    this.orderReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.router.navigate(["pages/master/place-order/edit/"+rowId]);

    // this.editData.id = rowId;
    // this.editData.title = "Edit Order";
    // this.openModal(PlaceOrderAddComponent, this.editData);
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
