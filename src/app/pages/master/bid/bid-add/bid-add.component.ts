import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { SellerTypeService } from '../../seller-type/seller-type.service';
import { UserService } from '../../user/user.service';
import { BidService } from '../bid.service';

@Component({
  selector: 'ngx-bid-add',
  templateUrl: './bid-add.component.html',
  styleUrls: ['./bid-add.component.scss']
})
export class BidAddComponent implements OnInit {


  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  sellerForm: FormGroup;
  id: string;
  title: string;
  sellers:any=[];
  buyers:any=[];
  selectedSeller:any={};
  selectedBuyer:any={};

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bidsService: BidService,
    private commonToasterService: CommonToastrService,
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.sellerForm = this.formBuilder.group({
      seller: ["", [Validators.required]],
      buyer:["",Validators.required],
      weight:["",Validators.required],
      amount:["",Validators.required]
    });
    if (this.data.id) {
      console.log(this.data)
        this.selectedSeller=this.data?.detailData?.orderCollection?.seller;
        this.sellerForm.patchValue({
          seller: this.selectedSeller,
          weight:this.data?.detailData?.weight,
          amount:this.data?.detailData?.amount
        });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    this.sellerForm.patchValue({
      seller:this.selectedSeller,
      buyer:this.selectedBuyer
    })
    let bidData = this.sellerForm.value;
    bidData.bidStatus=0;
    // if (this.id) {
    //   bidData.id = this.id;
    // }
    bidData.orderCollectionDetail={
      id:this.data?.id
    }
    this.sendForm(bidData);
  };

  getUsers=()=>{
    this.userService.getAllUsers().toPromise().then((data:any[])=>{
     const seller=data.filter((obj) => {
       return obj.userType === "seller";
     });
     const buyer =data.filter((obj)=>{
      return obj.userType === "buyer";
     })
     this.sellers=seller;
     this.buyers=buyer;
    });
  }

  sendForm = (data) => {
    if (!this.sellerForm.invalid) {
      this.bidsService.saveBid(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "Bid");
      });
    }
  };

  get basic() {
    return this.sellerForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  };

}
