import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css'],
})
export class CandidateRegisterComponent implements OnInit {
  typeofjob = [
    'FULL TIME',
    'PART TIME',
    'FREELANCE',
    'INTERNSHIP',
    'TEMPORARY',
  ];
  exp = ['FRESHER', 'EXPERIENCE'];
  fileAttr = 'Choose File';
  url: any;
  acceptedFileTypes = ['.jpg', '.jpeg', '.png'];

  allMobileNo: any;
  datePipe = new DatePipe('en-Us');
  regForm!: FormGroup;
  selected!: string;
  isExperience = false;
  profileSize!: number;
  resumeSize!: number;
  resumeError = false;
  profileError = false;
  image!: string;
  profile!: string; // profile name
  resume!: string; // resume name
  today!: Date;
  states: any;
  mainSkill: any;
  mcatId!: string;
  sId!: string;
  cId!: string;
  comSId!: string;
  comCId!: string;
  cities: any;
  cCities: any; // company city
  msg!: string;
  newProfileName!: string;
  newResumeName!: string;

  mainSkillWithoutFilter: any;
  StateWithoutFilter: any;
  CityWithoutFilter: any;
  cCityWithoutFilter: any;

  resumeUploader: FileUploader = new FileUploader({
    url: 'http://192.168.1.111:3000/resume',
  });
  profileUploader: FileUploader = new FileUploader({
    url: 'http://192.168.1.111:3000/profile',
  });

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      profileImage: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{5}$'),
      ]),
      resumes: new FormControl(''),
      typeOfJob: new FormControl('', [Validators.required]),
      skill: new FormControl('', [Validators.required]),
      professionalExp: new FormControl('', [Validators.required]),
      companyName: new FormControl(''),
      companyState: new FormControl(''),
      companyCity: new FormControl(''),
      expTime: new FormControl(''),
      joinDate: new FormControl(''),
      endDate: new FormControl(''),
      pastSalary: new FormControl('', Validators.pattern('^[0-9]*$')),
      expectedSalary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9rs]*$'),
      ]),
    });

    this.commonService.getState().subscribe((res: any) => {
      this.states = res;
      this.StateWithoutFilter = res;
    });

    this.authService.allMobileNo().subscribe((res) => {
      this.allMobileNo = res;
    });

    this.commonService.getMainSkill().subscribe((res: any) => {
      this.mainSkill = res;
      this.mainSkillWithoutFilter = res;
    });
    //this.onStateCity(this.regForm.value.state);
    // this.states = this.states.map(function(s:any){ return s.toUpperCase(); })
  }

  // when data submit
  onSave() {
    this.regForm.value.mobileNo = '+91' + this.regForm.value.mobileNo;

    //console.log(this.regForm.value);

    this.authService
      .candidateSignup(this.regForm.value)
      .subscribe((res: any) => {
        if (res.body === 'Done') {
          this.profileUploader.uploadAll(); // upload profile
          this.resumeUploader.uploadAll(); // upload resume

          //rename uploaded profile and resume in database

          this.profileUploader.onCompleteItem = (
            item: any,
            response: any,
            status: any,
            headers: any
          ) => {
            let res = JSON.parse(response);
            this.authService
              .renameCanFiles({
                mobileNo: this.regForm.value.mobileNo,
                profile: res.uploadname,
              })
              .subscribe((res: any) => {
                res;
              });
          };
          this.resumeUploader.onCompleteItem = (
            item: any,
            response: any,
            status: any,
            headers: any
          ) => {
            let res = JSON.parse(response);
            this.authService
              .renameCanFiles({
                mobileNo: this.regForm.value.mobileNo,
                resume: res.uploadname,
              })
              .subscribe((res: any) => {
                res;
              });
          };
          this.regForm.reset();
          this.image = '';
          this.profile = '';
          this.resume = '';
          this.toast.success('Inserted Successfully', 'Notification');

          this.router.navigate(['/login']);
        } else {
          this.toast.error(res.body, 'Notification');
        }
      });
  }

  onStateCity(id: string, name: string) {
    // this.regForm.controls['state'].setValue(name);
    // this.sId = id;
    if (id) {
      this.commonService.getCity(id).subscribe((res: any) => {
        this.CityWithoutFilter = res[0].cities;
        this.cities = res[0].cities;
      });
    }
  }

  // skill
  onMainSkill(id: string, name: string) {
    this.regForm.controls['skill'].setValue(name);
    this.mcatId = id;
  }

  // onCity(id: string, name: string) {
  //   this.regForm.controls['city'].setValue(name);
  //   this.cId = id;
  // }

  onCompanyStateCity(id: string, name: string) {
    // this.regForm.controls['companyState'].setValue(name);
    // this.comSId = id;
    if (id) {
      this.commonService.getCity(id).subscribe((res: any) => {
        this.cCityWithoutFilter = res[0].cities;
        this.cCities = res[0].cities;
      });
    }
  }

  onCompanyCity(id: string, name: string) {
    this.regForm.controls['companyCity'].setValue(name);
    this.comCId = id;
  }

  changeTextToUppercase(field: any) {
    const obj = [];
    obj[field] = this.regForm.controls[field].value.toUpperCase();
    this.regForm.patchValue(obj);
  }

  checkMobileNo() {
    this.commonService
      .checkMobile(this.regForm.value.mobileNo, this.allMobileNo)
      .subscribe((res) => {
        if (res.length != 0) {
          this.toast.error('Mobile number already Exist', 'Notification');
        }
        this.regForm.value.mobileNo = '+91' + this.regForm.value.mobileNo;
      });
  }
  // on change of Professional Experiance
  onChange(event: any) {
    // console.log(event.value);
    if (event.value === 'EXPERIENCE') {
      this.isExperience = true;
      this.regForm.get('companyName')?.setValidators([Validators.required]);
      this.regForm.get('companyState')?.setValidators([Validators.required]);
      this.regForm.get('companyCity')?.setValidators([Validators.required]);
      this.regForm.get('expTime')?.setValidators([Validators.required]);
      this.regForm.get('joinDate')?.setValidators([Validators.required]);
      this.regForm.get('endDate')?.setValidators([Validators.required]);
      this.regForm.get('pastSalary')?.setValidators([Validators.required]);
    } else {
      this.isExperience = false;
      this.regForm.get('companyName')?.setValidators([]);
      this.regForm.get('companyState')?.setValidators([]);
      this.regForm.get('companyCity')?.setValidators([]);
      this.regForm.get('expTime')?.setValidators([]);
      this.regForm.get('joinDate')?.setValidators([]);
      this.regForm.get('endDate')?.setValidators([]);
      this.regForm.get('pastSalary')?.setValidators([]);
    }
  }

  //get file name
  onProfileChange(event: any) {
    if (event.target.files[0]) {
      this.fileAttr = '';
      const file = event.target.files[0];

      this.profileSize = event.target.files[0].size / 1024 / 1024;
      if (this.profileSize > 1) {
        //1mb
        this.profileError = true;
        this.profile =
          'Profile Image is greater than 1 mb. Please select other';
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result as string;
        };
        reader.readAsDataURL(file);

        this.profileError = false;
      }
    }
  }

  onResumeChange(event: any) {
    if (event.target.files[0].type === 'application/pdf') {
      this.resumeError = false;
      this.resume = event.target.files[0].name;
      this.resumeSize = event.target.files[0].size / 1024 / 1024;
      if (this.resumeSize > 1) {
        //1mb
        this.resumeError = true;
        this.resume = 'Resume is greater than 1 mb. Please select other';
      }
    } else {
      this.resumeError = true;
      this.resume = 'Selected File is not PDF';
    }
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

  FilterCompanyState() {
    this.commonService
      .filter(this.regForm.value.companyState, this.StateWithoutFilter)
      .subscribe((res: any) => {
        this.states = res;
      });
  }

  FilterCompanyCity() {
    this.commonService
      .filter(this.regForm.value.companyCity, this.cCityWithoutFilter)
      .subscribe((res: any) => {
        this.cCities = res;
      });
  }

  FilterSkill() {
    if (this.regForm.value.skill) {
      this.commonService
        .filter(this.regForm.value.skill, this.mainSkillWithoutFilter)
        .subscribe((res: any) => {
          this.mainSkill = res;
          // this.mainSkill = res.slice(0, 10); // show first 10 records
        });
    }
  }
}
