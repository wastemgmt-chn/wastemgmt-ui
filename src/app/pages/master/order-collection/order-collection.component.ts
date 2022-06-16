import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';

@Component({
  selector: 'ngx-order-collection',
  templateUrl: './order-collection.component.html',
  styleUrls: ['./order-collection.component.scss']
})
export class OrderCollectionComponent implements OnInit {
  openModal(UserAddComponent: any, editData: any) {
    throw new Error('Method not implemented.');
  }

  matDialogRef: MatDialogRef<any>;
  orderReloadEvent: Subject<void> = new Subject<void>();

  Title: String = "Order Collection";

  editData: any = {};
  constructor(private responseModelService: ResponseModalService) { }

  ngOnInit() {
  }

  emitEventToReload = () => {
    this.orderReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit User";
   this.openModal(OrderCollectionComponent, this.editData);
  };



}
