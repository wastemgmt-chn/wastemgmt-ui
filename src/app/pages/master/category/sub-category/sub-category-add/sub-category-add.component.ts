import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfiguration } from '../../../../shared/AppConfiguration';
import { CommonToastrService } from '../../../../shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../../shared/response-modal/response-modal.service';
import { trimValidator } from '../../../../shared/trim.validator';
import { SubCategoryService } from '../sub-category.service';

@Component({
  selector: 'ngx-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.scss']
})
export class SubCategoryAddComponent implements OnInit {

  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  subCategoryForm: FormGroup;
  id: string;
  title: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subCategoryService: SubCategoryService,
    private commonToasterService: CommonToastrService,
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.subCategoryForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    if (this.data.id) {
      this.subCategoryService.getSubCategoryById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.subCategoryForm.patchValue({
          name: data?.name,
        });
      });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let Data = this.subCategoryForm.value;
    if (this.id) {
      Data.id = this.id;
    }
    this.sendForm(Data);
  };

  sendForm = (data) => {
    if (!this.subCategoryForm.invalid) {
      this.subCategoryService.saveSubCategory(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "Sub Category");
      });
    }
  };

  get basic() {
    return this.subCategoryForm.controls;
  }

  cancel = () => {
    this.dialogRef.close(true);
  };

}
