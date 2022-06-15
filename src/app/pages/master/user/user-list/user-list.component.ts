import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private eventsSubscription: Subscription;
  matDialogRef: MatDialogRef<any>;
  @Input() events: Observable<void>;
  @Output() editRow = new EventEmitter();
  @Output() editFromList = new EventEmitter();
  @Output() status = new EventEmitter();
  public datatrigger: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ["Name", "Mobile Number", "User Type", "status", "actions"];
  searchColumns: any[] = [
    { name: "name", canShow: true },
    { name: "mobileNumber", canShow: false },
    { name: "userType", canShow: true },

  ];
  definedColumns = ["name", "mobileNumber", "userType"];
  postPerPage: number = 10;
  pageNumber: number = 1;
  count: number = 0;
  users: any[] = [];
  filters: any[] = [];
  constructor(
    private userService: UserService,
    private responseModalService: ResponseModalService,
    private commonToastrService: CommonToastrService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      if (data != undefined) {
        this.filters.push(data);
      }
      this.loadData();
    });
    this.loadData();
  }

  loadData = () => {
    this.userService
      .getUsers(this.postPerPage, this.pageNumber, this.filters)
      .subscribe((datas: any) => {
        this.users = datas?.data;
        this.datatrigger.emit(this.users);
        this.count = datas?.recordsTotal;
      });
  };
  onPaginate = (pageObject) => {
    this.postPerPage = pageObject.postPerPage;
    this.pageNumber = pageObject.pageNumber;
    this.loadData();
  };

  edit = (rowId: any) => {
    this.editFromList.emit(rowId);
  };

  detail = (event) => {
    this.userService.getUserById(event).toPromise().then((data: any[]) => {
      this.responseModalService.openModalRight(UserDetailComponent, data);
    })
  }

  changeStatus = (row) => {
    if (row?.isActive == true) {
      row.isActive = false;
      this.userService.saveUser(row).toPromise().then((data: any) => {
        this.commonToastrService.showSuccess("Deactivated", "User");
        this.loadData();
      })
    } else {
      row.isActive = true;
      this.userService.saveUser(row).toPromise().then((data: any) => {
        this.commonToastrService.showSuccess("Activated", "User");
        this.loadData();
      })
    }
  }

  onSearch = (filters: any[]) => {
    this.filters = filters;
    this.loadData();
  };
}
