import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonToastrService } from "../pages/shared/common-toastr/common-toastr.service";


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  generatedToken: any;
  isSubmit:boolean=false;

  constructor(
    public formBuilder: FormBuilder,
    private commonToastrService:CommonToastrService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit = () => {
    if(this.loginForm.valid){
      if(this.loginForm.value.userName=='vvignesh'&&this.loginForm.value.password=='1234'){
        if (this.loginForm.valid) {
          this.generatedToken = this.loginForm.value.userName;
            localStorage.setItem("token", this.generatedToken);
            this.router.navigate(['pages/dashboard']);
          // this.userService.checkValidLogin(loginData).subscribe((data: any) => {})
        }
    }
    else{
      this.isSubmit=true;
      this.commonToastrService.showWarning("Invalid UserName Or Password","Login Failed");
    }
    }
  }
  get basic() {
    return this.loginForm.controls;
  }

}
