import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { ResponseModalService } from '../../shared/response-modal/response-modal.service';
import { UserDetailComponent } from '../user/user-detail/user-detail.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ngx-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']

})
export class UserLocationComponent implements OnInit {
  matDialogRef: MatDialogRef<any>;

  lat: any;

  lng: any ;
  previous;
  @Output() clicked = new EventEmitter<any>();
  click: boolean = false;
  index: number;
  userAddress:any=[];



 zoom= 4;

  markers:any = [];
  data: any;


  constructor(
   private userService:UserService,
   private responseModalService:ResponseModalService

    ){ }

  ngOnInit() {
    this.getUsers();
console.log(this.markers)  }
  getUsers = () => {
    this.userService.getAllUserAddress().toPromise().then((data:any[])=>{
      this.userAddress=data;
      data.forEach((element:any) => {
        let coordinates={
          lat:element?.latitude,
          lng:element?.longitude
        }
        this.markers.push(coordinates);
      });
    })




  }



  clickedMarker(infoWindow: any, index: number) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
    console.log(this.userAddress[index])
    this.userService.getUserById(this.userAddress[index].user.id).toPromise().then((data:any)=>{
      this.responseModalService.openModalRight(UserDetailComponent, data);
    })

    this.clicked.emit(index);
  }
  mapClicked($event: MouseEvent) {}
  markerDragEnd(marker: marker, $event: MouseEvent) {
    console.log($event);
  }


}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}




