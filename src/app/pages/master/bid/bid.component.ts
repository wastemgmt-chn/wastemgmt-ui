import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { SellerTypeAddComponent } from '../seller-type/seller-type-add/seller-type-add.component';
import { BidAddComponent } from './bid-add/bid-add.component';

@Component({
  selector: 'ngx-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;
  //Trigger reload to list
  bidReloadEvent: Subject<void> = new Subject<void>();
  //Page Header
  title: string = "Bid";            //To set the title for page header
  buttonText: string = "Add Bid";   //To set the add button text for page header
  //Form
  editData: any = {};                  //Send edit data to add component
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(BidAddComponent, data);
  };
  emitEventToReload = () => {
    this.bidReloadEvent.next();
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit Bid";
    this.openModal(BidAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalMD(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.bidReloadEvent.next(text);
  };

}
