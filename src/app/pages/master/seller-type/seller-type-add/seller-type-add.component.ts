import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfiguration } from '../../../shared/AppConfiguration';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { trimValidator } from '../../../shared/trim.validator';
import { SellerTypeService } from '../seller-type.service';

@Component({
  selector: 'ngx-seller-type-add',
  templateUrl: './seller-type-add.component.html',
  styleUrls: ['./seller-type-add.component.scss']
})
export class SellerTypeAddComponent implements OnInit {


  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  sellerForm: FormGroup;
  id: string;
  title: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sellerTypeService: SellerTypeService,
    private commonToasterService: CommonToastrService,
    private responseModalService: ResponseModalService,
    private appConfiguration: AppConfiguration
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.sellerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    if (this.data.id) {
      this.sellerTypeService.getSellerById(this.data?.id).subscribe((data: any) => {
        this.id = data?.id;
        this.sellerForm.patchValue({
          name: data?.name,
        });
      });
    }
    this.isSubmit = false;
  }
  submitForm = () => {
    this.isSubmit = true;
    this.saveEvent.emit(true);
    let Data = this.sellerForm.value;
    if (this.id) {
      Data.id = this.id;
    }
    this.sendForm(Data);
  };

  sendForm = (data) => {
    if (!this.sellerForm.invalid) {
      this.sellerTypeService.saveSeller(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "Seller Type");
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
