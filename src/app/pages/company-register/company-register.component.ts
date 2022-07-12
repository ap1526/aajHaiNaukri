import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css'],
})
export class CompanyRegisterComponent implements OnInit {
  allMobileNo: any;
  regForm!: FormGroup;
  image!: string;
  logoError = false;
  logo!: string;
  logoSize!: number;
  cnt = 0;
  cities: any;
  states: any;
  mainSkill: any;
  sId!: string;
  cId!: string;
  mcatId!: string;
  isStateSelected = false;

  mainSkillWithoutFilter: any;
  StateWithoutFilter: any;
  CityWithoutFilter: any;

  logoUploader: FileUploader = new FileUploader({
    url: 'http://192.168.1.111:3000/logo',
  });

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gst: new FormControl(''),
      yearOfCompany: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      roleDetails: new FormControl('', [Validators.required]),
      totalEmployee: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      bio: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      website: new FormControl(''),
      turnover: new FormControl(''),
    });

    this.commonService.getState().subscribe((res: any) => {
      this.states = res;
      this.StateWithoutFilter = res;
    });

    this.commonService.getMainSkill().subscribe((res: any) => {
      this.mainSkill = res;
      this.mainSkillWithoutFilter = res;
    });

    this.authService.allMobileNo().subscribe((res) => {
      this.allMobileNo = res;
    });
  }

  onSave() {
    if (this.regForm.valid) {
      this.regForm.value.mobileNo = '+91' + this.regForm.value.mobileNo;
      // console.log(this.regForm.value);

      this.authService
        .companySignup(this.regForm.value)
        .subscribe((res: any) => {
          if (res.body === 'Done') {
            this.logoUploader.uploadAll(); // upload logo

            //rename uploaded profile and resume in database

            this.logoUploader.onCompleteItem = (
              item: any,
              response: any,
              status: any,
              headers: any
            ) => {
              let res = JSON.parse(response);
              this.authService
                .renameCmpFiles({
                  mobileNo: this.regForm.value.mobileNo,
                  logo: res.uploadname,
                })
                .subscribe((res: any) => {
                  if (res) {
                    this.regForm.reset();
                    this.image = '';
                    this.logo = '';
                    this.cnt = 0;
                    this.toast.success('Inserted Successfully', 'Notification');
                    this.router.navigate(['/login']);
                  }
                });
            };
          } else {
            this.toast.error(res.body, 'Notification');
          }
        });
    } else {
      this.commonService.validateAllFormFields(this.regForm);
      this.toast.error('Please fill Data', 'Notification');
    }
  }

  changeTextToUppercase(field: any) {
    const obj = [];
    obj[field] = this.regForm.controls[field].value.toUpperCase();
    this.regForm.patchValue(obj);
  }

  onStateCity(id: string, name: string) {
    this.regForm.controls['state'].setValue(name);
    this.sId = id;
    if (id) {
      this.commonService.getCity(id).subscribe((res: any) => {
        this.isStateSelected = true;
        this.CityWithoutFilter = res[0].cities;
        this.cities = res[0].cities;
      });
    }
  }

  // Skill
  onMainSkill(id: string, name: string) {
    this.regForm.controls['category'].setValue(name);
    this.mcatId = id;
  }

  onCity(id: string, name: string) {
    this.regForm.controls['city'].setValue(name);
    this.cId = id;
  }

  charCount() {
    this.cnt = this.regForm.value.bio.length;
  }

  onlogoChange(event: any) {
    const file = event.target.files[0];
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    if (types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.logoError = false;
      this.logo = file.name;
      this.logoSize = event.target.files[0].size / 1024 / 1024;
      if (this.logoSize > 1) {
        //1mb
        this.logoError = true;
        this.logo = 'Profile Image is greater than 1 mb. Please select other';
      }
    } else {
      this.logoError = true;
      this.logo = 'Selected File is not .png/.jpg/.jpeg';
    }
  }

  checkMobileNo() {
    this.commonService
      .checkMobile(this.regForm.value.mobileNo, this.allMobileNo)
      .subscribe((res) => {
        if (res.length != 0) {
          this.toast.error('Mobile number already Exist', 'Notification');
        }
      });
  }

  FilterState() {
    this.commonService
      .filter(this.regForm.value.state, this.StateWithoutFilter)
      .subscribe((res: any) => {
        this.states = res;
      });
  }

  FilterCity() {
    this.commonService
      .filter(this.regForm.value.city, this.CityWithoutFilter)
      .subscribe((res: any) => {
        this.cities = res;
      });
  }

  FilterSkill() {
    this.commonService
      .filter(this.regForm.value.Skill, this.mainSkillWithoutFilter)
      .subscribe((res: any) => {
        this.mainSkill = res;
      });
  }
}
