import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfiguration } from '../../../shared/AppConfiguration';
import { CommonToastrService } from '../../../shared/common-toastr/common-toastr.service';
import { ResponseModalService } from '../../../shared/response-modal/response-modal.service';
import { SellerTypeService } from '../../seller-type/seller-type.service';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {


  @Output() saveEvent = new EventEmitter();
  isSubmit: boolean;
  sellerForm: FormGroup;
  id: string;
  title: string;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private commonToasterService: CommonToastrService,
  ) {}

  ngOnInit() {
    this.title = this.data?.title;
    this.sellerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
    });
    if (this.data.id) {
      this.userService.getUserById(this.data?.id).subscribe((data: any) => {
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
      this.userService.saveUser(data).subscribe((data: any) => {
        this.cancel();
        this.commonToasterService.showSuccess("Added Successfully", "User");
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
