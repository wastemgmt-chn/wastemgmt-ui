import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { SellerTypeAddComponent } from './seller-type-add/seller-type-add.component';

@Component({
  selector: 'ngx-seller-type',
  templateUrl: './seller-type.component.html',
  styleUrls: ['./seller-type.component.scss']
})
export class SellerTypeComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  sellerReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Seller Type";            //To set the title for page header
  buttonText: string = "Add Seller Type";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(SellerTypeAddComponent, data);
  };
  emitEventToReload = () => {
    this.sellerReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Seller Type";
    this.openModal(SellerTypeAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.sellerReloadEvent.next(text);
  };

}
