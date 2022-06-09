import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonToastrService } from '../../../../shared/common-toastr/common-toastr.service';
import { MultiSelectComponent } from '../../../../shared/multi-select/multi-select.component';
import { trimValidator } from '../../../../shared/trim.validator';
import { SubCategoryService } from '../../sub-category/sub-category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  @ViewChild("subCategoryMultiSelect",{static:false}) subCategoryMultiSelectComponent: MultiSelectComponent;
  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  productForm: FormGroup;
  id: string;
  title: string;
  subCategories:any=[];
  selectedSubCategory:any={};

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private commonToasterService: CommonToastrService,
    private subCategoryService:SubCategoryService
  ) {}

  ngOnInit() {
    this.getSubCategories();
    this.title = this.data?.title;
    this.productForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      subCategory:[this.selectedSubCategory,Validators.required]
    });
    if (this.data.id) {
      this.productService.getProductById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.selectedSubCategory=data?.subCategory
        this.productForm.patchValue({
          name: data?.name,
          subCategory: this.selectedSubCategory
        });
      });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.subCategoryMultiSelectComponent.formInvalid();
    this.saveEvent.emit(true);
    this.productForm.patchValue({
      subCategory: this.selectedSubCategory
    })
    let data = this.productForm.value;
    if (this.id) {
      data.id = this.id;
    }
    this.sendForm(data);
  };

  sendForm = (data) => {
    if (!this.productForm.invalid) {
      this.productService.saveProduct(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "Product");
      });
    }
  };

  get basic() {
    return this.productForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  };

  getSubCategories(){
    this.subCategoryService.getAllSubCategories().toPromise().then((data:any[])=>{
      this.subCategories=data;
    })
  }
}
