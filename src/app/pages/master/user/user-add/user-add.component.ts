import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { loadavg } from 'os';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../shared/multi-select/multi-select.component';
import { ProductService } from '../../category/product/product.service';
import { SellerTypeService } from '../../seller-type/seller-type.service';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @ViewChild("sellerTypeMultiSelect", { static: false }) sellerTypeMultiSelectComponent: MultiSelectComponent;
  @ViewChild("roleMultiSelect", { static: false }) roleMultiSelectComponent: MultiSelectComponent;
  @ViewChild("productMultiSelect", { static: false }) productMultiSelectComponent: MultiSelectComponent;


  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  userForm: FormGroup;
  id: string;
  title: string;
  sellerTypes: any = [];
  roles: any = [];
  products: any = [];
  selectedSellerType: any = {};
  selectedRole: any = {};
  selectedProducts: any = [];
  userAddressId:any=[];

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private commonToasterService: CommonToastrService,
    private router: Router,
    private sellerTypeService: SellerTypeService,
    private productService: ProductService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getSellerTypes();
    this.getRoles();
    this.getProducts();
    this.getValueById();
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      companyName: ["", Validators.required],
      isActive: [false],
      userType:["",Validators.required],
      sellerType:[""],
      role:[""],
      favoriteProducts:[""],
      userAddress:this.formBuilder.array([ ])
    });
  }
  getValueById(){
    this.id = this.route.snapshot.params.id;
    if(!!this.id){
      this.userService.getUserById(this.id).toPromise().then((data:any)=>{
        this.selectedProducts=data?.favoriteProducts;
        this.selectedRole=data?.role;
        this.selectedSellerType=data?.sellerType;
        this.userForm.patchValue({
            name:data?.name,
            mobileNumber:data?.mobileNumber,
            email:data?.email,
            userType:data?.userType,
            companyName:data?.companyName,
            isActive:data?.isActive,
        })
        data?.userAddress.forEach(element => {
          const add = this.userForm.get('userAddress') as FormArray;
          add.push(
            this.formBuilder.group({
              doorNo: [element?.doorNo],
              street: [element?.street],
              area:[element?.area],
              postalCode:[element?.postalCode],
              latitude:[element?.latitude],
              longitude:[element?.longitude],
              id:[element?.id]
            })
          )
        });
      })
    }
  }
  addNewAddressGroup() {
    const add = this.userForm.get('userAddress') as FormArray;
    add.push(
      this.formBuilder.group({
        doorNo: [""],
        street: [""],
        area:[""],
        postalCode:[""],
        latitude:[""],
        longitude:[""],
      })
    );
  }
  deleteAddressGroup(index: number) {
    const add = this.userForm.get('userAddress') as FormArray;
    if(add.at(index).value.id){
      this.userAddressId.push(add.at(index).value.id)
    }
     add.removeAt(index);
  }

  submitForm = () => {
    this.isSubmit = true;
    this.sellerTypeMultiSelectComponent.formInvalid();
    this.roleMultiSelectComponent.formInvalid();
    this.productMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.userForm.patchValue({
      sellerType:this.selectedSellerType,
      role:this.selectedRole,
      favoriteProducts:this.selectedProducts,
    })
    let Data = this.userForm.value;
    Data.userType=Data.userType.toLowerCase();
    if (this.id) {
      Data.id = this.id;
    }
    this.sendForm(Data);
  };

  sendForm = (data) => {
       this.userAddressId.forEach((data:any)=>{
         this.userService.deleteUserAddress(data).toPromise().then((data:any)=>{ });
      })
     if (!this.userForm.invalid) {
      this.userService.saveUser(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "User");
     });
     }
  };

  get basic() {
    return this.userForm.controls;
  }


  cancel = () => {
      this.router.navigate(["pages/master/user"]);
  };

  getSellerTypes = () => {
    this.sellerTypeService.getAllSellers().toPromise().then((data: any[]) => {
      this.sellerTypes = data;
    })
  }
  getRoles = () => {
    this.userService.getRoles().toPromise().then((data: any[]) => {
      this.roles = data;
    })
  }
  getProducts = () => {
    this.productService.getAllProducts().toPromise().then((data: any[]) => {
      this.products = data;
    })
  }

}
