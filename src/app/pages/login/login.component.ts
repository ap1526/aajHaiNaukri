import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  otp!: string;
  showOtpComponent = true;
  reCaptchaVerifier!: any;
  showOTP: boolean = false;
  isResend = false;
  hideSubmit: boolean = false;
  verify: any;
  get_otp: any;
  loginas!: string;
  timerOn = false;
  time!: string;
  cnt = 0;
  configTime!: CountdownConfig;

  countDown!: Subscription;
  counter = 120;
  tick = 1000;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: { width: '50px', height: '50px' },
  };

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
    });
  }

  loginAs(as: any) {
    if (as === '') {
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      this.loginas = '';
    } else {
    }
    this.loginas = as;
    this.loginForm.reset();
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginas, '+91' + this.loginForm.value.mobileNo)
        .subscribe((res: any) => {
          if (res.body == null) {
            this.toast.error('Mobile No is incorrect', 'Notification');
          } else {
            const user = res.body;
            this.sendOtp();
          }
        });
    } else {
      this.commonService.validateAllFormFields(this.loginForm);
    }
  }

  sendOtp() {
    this.showOTP = true;
    this.timerOn = true;
    // this.configTime = { leftTime: 120, format: 'm:s' };

    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      const minutes: number = Math.floor(this.counter / 60);
      this.time =
        ('00' + minutes).slice(-2) +
        ':' +
        ('00' + Math.floor(this.counter - minutes * 60)).slice(-2);
      if (this.time == '00:00') {
        this.isResend = true;
        this.cnt = 0;
        this.countDown.unsubscribe();
        this.time = '';
      }
    });

    // var _url =
    //   'https://trnsms.soft-techsolutions.com/v3/sms/submit?user=SARDAR&authkey=90d99d6351ecded3ca68&mobile=';
    // var mobile_no = this.loginForm.value.toString();
    // var middle = '&message=';
    // var otp = Math.floor(100000 + Math.random() * 900000).toString();
    // var message =
    //   ' is your GPBS - 2022 account registration verification code. Do not share it with anyone. GPBS 2022&senderid=GPBSEV&smstype=T&templateid=1307163186854846267';

    // var URL = _url + mobile_no + middle + otp + message;

    //HttpWebRequest req = (HttpWebRequest)WebRequest.Create(URL);
    this.authService.otp(this.loginForm.value).subscribe((otp) => {
      this.timerOn = true;
      this.get_otp = otp.body;
      console.log(this.get_otp);
      sessionStorage.setItem('login-otp', this.get_otp);
    });
  }

  resendOtp() {
    this.counter = 120;
    this.isResend = false;
    this.sendOtp();
  }

  inputOtp(event: any) {
    this.otp = event;
  }

  ClickVerify() {
    this.get_otp = sessionStorage.getItem('login-otp');
    if (this.get_otp === this.otp) {
      this.toast.success('You are logedin', 'Notification');

      sessionStorage.removeItem('login-otp');
      sessionStorage.setItem(
        'logedinUser',
        '+91' + this.loginForm.value.mobileNo
      );
      sessionStorage.setItem('loginAs', this.loginas);

      if (this.loginas == 'Candidate') {
        setTimeout(() => {
          this.router.navigate(['/candidate-dashboard']);
        }, 200);
      } else {
        setTimeout(() => {
          this.router.navigate(['/company-home']);
        }, 200);
      }
      this.cnt = 0;
      this.showOTP = false;
      this.loginas = '';
      this.timerOn = false;
      this.isResend = false;
    } else {
      this.cnt++;

      if (this.cnt >= 3) {
        this.isResend = true;
        this.toast.error('Wrong Otp', 'Notification');
        this.cnt = 0;
        this.countDown.unsubscribe();
        this.time = '';
        sessionStorage.removeItem('login-otp');
      }
    }
  }

}
