import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css'],
})
export class AdminAuthComponent implements OnInit {
  adminRegForm!: FormGroup;
  adminLoginForm!: FormGroup;
  isSignin = true;
  isShowPwd = false;
  pwdError!: string;
  error!: string;
  pwdstrength!: string;

  allMobileNo: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    this.adminRegForm = new FormGroup({
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.authService.allMobileNo().subscribe((res) => {
      this.allMobileNo = res;
    });
  }

  onLogin() {
    if (this.adminLoginForm.valid) {
      this.authService
        .adminLogin(this.adminLoginForm.value)
        .subscribe((res: any) => {
          if (res.error) {
            this.error = res.error;
          } else {
            sessionStorage.setItem(
              'logedinUser',
              '+91' + this.adminLoginForm.value.mobileNo
            );
            this.router.navigate(['/admin/dashboard']);
          }
        });
      //this.toast.error("Mobile No is incorrect","Notification");
    } else {
      this.error = 'This field is required';
    }
  }

  onSave() {
    if (this.adminRegForm.valid) {
      this.authService.adminSignup(this.adminRegForm.value).subscribe(() => {
        this.router.navigate(['/admin/login']).then(() => {
          window.location.reload();
        });
      });
    } else {
      this.pwdError = 'Please fill the data';
    }
  }

  pwdCheck() {
    if (
      this.adminRegForm.value.password !== this.adminRegForm.value.cpassword
    ) {
      this.pwdError = 'Password does not match. Try Again';
    } else {
      this.pwdError = '';
    }
  }

  checkMobileNo() {
    this.commonService
      .checkMobile(this.adminRegForm.value.mobileNo, this.allMobileNo)
      .subscribe((res) => {
        console.log(res.length);
        if (res.length != 0) {
          this.toast.error('Mobile number already Exist', 'Notification');
        }
      });
  }

  pwdHideShow() {
    this.isShowPwd = !this.isShowPwd;
  }

  showSign(as: string) {
    if (as === 'signUp') {
      this.isSignin = false;
    } else {
      this.isSignin = true;
    }
  }

  passwordStrength() {
    let pwd = this.adminRegForm.value.password;
    let uppercase = /[A-Z]+/g;
    let lowercase = /[a-z]+/g;
    let numeric = /[0-9]+/g;
    let special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let res = '';

    if (!uppercase.test(pwd)) {
      res += ' 1 uppercase,';
    }
    if (!lowercase.test(pwd)) {
      res += ' 1 lowercase,';
    }
    if (!numeric.test(pwd)) {
      res += ' 1 numeric,';
    }
    if (!special.test(pwd)) {
      res += ' 1 special,';
    }
    this.pwdstrength =
      res == '' ? '' : 'Password should at least ' + res.slice(0, -1);
  }
}
