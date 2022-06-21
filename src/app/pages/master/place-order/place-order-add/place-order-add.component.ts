import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { ProductService } from '../../category/product/product.service';
import { UserService } from '../../user/user.service';
import { PlaceOrderDetailComponent } from '../place-order-detail/place-order-detail.component';
import { PlaceOrderService } from '../place-order.service';
import { Guid } from "guid-typescript";


@Component({
  selector: 'ngx-place-order-add',
  templateUrl: './place-order-add.component.html',
  styleUrls: ['./place-order-add.component.scss']
})
export class PlaceOrderAddComponent implements OnInit {
  @ViewChild("orderDetails", { static: false })orderDetailsComponent: PlaceOrderDetailComponent;

  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  orderForm: FormGroup;
  id: string;
  title: string;
  orderDetailId:any;
  products:any=[];
  sellers:any=[];
  selectedProduct={};
  selectedSeller={};
    editData: any;
  editcall:boolean=false;
  deleteData: any;
  deleteArray:any[]=[];
  showOrderDetails:boolean=false;
  orderDetails: any[] = [];
  amount: any;
weight:any;
product:any;
imageLink:any;
comment:any;
selectedDetailId:any;
tempId:String;
public guidId: Guid;
orderDetail:any=[];


  constructor(
    public formBuilder: FormBuilder,
    private placeOrderService: PlaceOrderService,
    private commonToasterService: CommonToastrService,
    private productService:ProductService,
    private userService:UserService,
    public route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.getSellers();
    this.orderForm = this.formBuilder.group({
      seller: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      isCompleted: ["", [Validators.required]],
    });
    this.getValueById();
    this.getSellers();
    this.isSubmit = false;
  }


   getSellers=()=>{
     this.userService.getAllUsers().toPromise().then((data:any[])=>{
      const result=data.filter((obj) => {
        return obj.userType === "seller";
      });
      this.sellers=result;
     });
   }


   onSellerChange=(event)=>{
    this.products=[];
    this.products=event?.favoriteProducts;
   }


  getValueById(){
    this.id = this.route.snapshot.params.id;
    if(!!this.id){
      this.placeOrderService.getOrderCollectionById(this.id).toPromise().then((data:any)=>{
        this.selectedSeller=data?.seller;
        this.orderForm.patchValue({
          seller:data?.seller,
          latitude:data?.latitude,
          longitude:data?.longitude,
          isCompleted:data?.isCompleted,
        })
        data?.orderCollectionDetail.forEach(element => {
          let datas = {
            id: element?.id,
            product: element?.product,
            weight: element?.weight,
            amount: element?.amount,
            imageLink:element?.imageLink,
            comment:element?.comment
          };
          this.orderDetails.push(datas);

        });
        this.orderDetailsComponent.reload( this.orderDetails);
        this.showOrderDetails=true;
      })

    }
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    this.orderForm.patchValue({
      seller:this.selectedSeller,
    })
    let data = this.orderForm.value;
    if (this.id) {
      data.id = this.id;
    }
    this.orderDetails.forEach((data:any)=>{
        if(data.id.slice(0, 4)=="temp"){
          data.id=null;
          this.orderDetail.push(data)
        }
        else{
           this.orderDetail.push(data)
        }
    })
    data["orderCollectionDetail"] = this.orderDetails;
    this.sendForm(data);
  };

  sendForm = (data) => {
    console.log(data)
    if (!this.orderForm.invalid) {
      this.placeOrderService.saveOrderCollection(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "Order");
      });
    }
  };


  addOrderDetails = () => {
    if(this.selectedDetailId==null){
     this.guidId=Guid.create();
     this.tempId='temp'+JSON.stringify(this.guidId);
      this.selectedDetailId=this.tempId;
     }
     let orderListList = {
      id: this?.selectedDetailId,
      product: this?.selectedProduct,
      amount: this?.amount,
      weight: this?.weight,
      imageLink:this?.imageLink,
      comment:this?.comment
    };
    this.setOrderDetails();
    this.orderDetails.push(orderListList);
    this.orderDetailsComponent.reload(this.orderDetails);
    if(this.editcall==true){
      this.orderDetails.splice(this.editData.index, 1);
      this.orderDetailsComponent.reload(this.orderDetails);
      this.editcall=false;
    }
    this.showOrderDetails = true;

  }
  deleteOrderCollectionGroup(index: number) {
    const add = this.orderForm.get('orderCollectionDetail') as FormArray;
    if(add.at(index).value.id){
      this.orderDetailId.push(add.at(index).value.id)
    }
     add.removeAt(index);
  }

deleteConfirm = (rowId) => {
    this.deleteArray.push(rowId);
    this.deleteData= this.findDataById(rowId)
    this.orderDetails.splice(this.deleteData.index, 1)
    this.orderDetailsComponent.reload(this.orderDetails);
};
edit = (rowId: any) => {
this.editData = this.findDataById(rowId);
if (!!this.editData) {
  this.editcall=true;
   this.setOrderDetails(this.editData.id, this.editData.product, this.editData.weight, this.editData.amount,this.editData?.imageLink,this.editData?.comment);
}
}
setOrderDetails = (id = null, product = "", weight = "", amount = null,imageLink="",comment="") => {
  this.selectedDetailId = id;
  this.selectedProduct = product;
  this.weight = weight;
  this.amount = amount;
  this.imageLink = imageLink;
  this.comment = comment;
};




  get basic() {
    return this.orderForm.controls;
  }

  cancel = () => {
    this.router.navigate(["pages/master/place-order"]);
  };

   //create index for service provider details
   findDataById(rowId) {
    let obj = this.orderDetails.find((detail, index) => {
      if (detail.id === rowId) {
        detail["index"] = index;
        return detail;
      }
    });
    return obj;
  }

}
