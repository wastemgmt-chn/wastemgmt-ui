import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private commonToasterService: CommonToastrService,
    private router: Router,
    private sellerTypeService: SellerTypeService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getSellerTypes();
    this.getRoles();
    this.getProducts();
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      userType: [""],
      companyName: ["", Validators.required],
      isActive: [false],
      sellerType:[""],
      role:[""],
      favoriteProducts:[""],
      userAddress:this.formBuilder.array([])

    });
  }
  addNewAddressGroup() {
    const add = this.userForm.get('userAddress') as FormArray;
    add.push(
      this.formBuilder.group({
        doorNo: ["",Validators.required],
        street: ["",Validators.required],
        area:["",Validators.required],
        postalCode:["",Validators.required],
        latitude:["",Validators.required],
        longitude:["",Validators.required]
      })
    );
  }
  deleteAddressGroup(index: number) {
    const add = this.userForm.get('userAddress') as FormArray;
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
      userType:'Admin'
    })
    let Data = this.userForm.value;
    if (this.id) {
      Data.id = this.id;
    }
    this.sendForm(Data);
  };

  sendForm = (data) => {
    // console.log(data)
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
