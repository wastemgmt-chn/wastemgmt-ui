import { Component, OnInit } from '@angular/core';
import { UserService } from '../../master/user/user.service';

@Component({
  selector: 'ngx-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  cardArray:any=[];

  constructor(private userService:UserService) { }


  ngOnInit() {
    this.getUserCount();
  }

  getUserCount(){

    this.userService.getUserCount().toPromise().then((data:any[])=>{
      this.cardArray=data;
    })

  }

}
