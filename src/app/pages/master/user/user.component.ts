import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  matDialogRef: MatDialogRef<any>;

  userReloadEvent: Subject<void> = new Subject<void>();

  title: string = "User";
  buttonText: string = "Add User";

  editData: any = {};
  constructor(
    private responseModalService: ResponseModalService,
    private router:Router) {}
  ngOnInit(): void {}

  emitEventToReload = () => {
    this.userReloadEvent.next();
  };
  add = () => {
    this.router.navigate(["pages/master/user/add"]);
    // this.openModal(UserAddComponent, data);
  };
  edit = (rowId: any) => {
    // this.editData.id = rowId;
    // this.editData.title = "Edit User";
    this.router.navigate(["pages/master/user/edit/"+rowId]);
    // this.openModal(UserAddComponent, this.editData);
  };
  openModal = (component: any, data: any) => {
    this.matDialogRef = this.responseModalService.openModalSM(component, data);
    this.matDialogRef.afterClosed().subscribe(() => {
      this.emitEventToReload();
    });
  };
  search = (text) => {
    this.userReloadEvent.next(text);
  };

}
