import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { UserAddComponent } from './user-add/user-add.component';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;

  userReloadEvent: Subject<void> = new Subject<void>();

  title: string = "User";
  buttonText: string = "User";

  editData: any = {};
  constructor(private responseModalService: ResponseModalService) {}
  ngOnInit(): void {}

  emitEventToReload = () => {
    this.userReloadEvent.next();
  };
  add = () => {
    let data = { title: this.buttonText };
    this.openModal(UserAddComponent, data);
  };
  edit = (rowId: any) => {
    this.editData.id = rowId;
    this.editData.title = "Edit User";
   this.openModal(UserAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe((res) => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.userReloadEvent.next(text);
  };

}
