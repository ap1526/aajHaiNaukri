import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';
import { CommonService } from 'src/app/service/common.service';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-hire-candidate',
  templateUrl: './hire-candidate.component.html',
  styleUrls: ['./hire-candidate.component.css'],
})
export class HireCandidateComponent implements OnInit {
  hireCandidateForm!: FormGroup;
  fileError = false;
  file!: string;
  fileSize!: number;
  fileUploader: FileUploader = new FileUploader({
    url: 'http://192.168.1.111:3000/file',
  });

  isLogin: any;
  cities: City[] = [];
  states: State[] = [];
  isStateSelected = false;
  stateFilter: State[] = [];
  cityFilter: City[] = [];

  isJobTitleSelected = false;

  constructor(
    private commonService: CommonService,
    private companyService: CompanyService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('logedinUser')) {
      this.router.navigate(['/login']);
    } else {
      this.isLogin = sessionStorage.getItem('logedinUser');
      this.companyService.getCompany(this.isLogin).subscribe((res: any) => {
        this.init(res[0]);
      });
      this.commonService.getState().subscribe((res: any) => {
        this.states = res;
        this.stateFilter = res;
      });
    }
  }

  addList(event: any) {
    const skillArray: FormArray = this.hireCandidateForm.get(
      'skill'
    ) as FormArray;
    console.log(event.value);
    //skillArray.push(new FormControl(this.hireCandidateForm.));
  }

  onHireCandidate() {
    if (this.hireCandidateForm.valid) {
      console.log(this.hireCandidateForm.value);
    }
  }

  onJobCategory() {
    //console.log(this.hireCandidateForm.value.jobTitle);
    this.isJobTitleSelected = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    if (types.includes(file.type)) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      this.fileError = false;
      this.file = file.name;
      this.fileSize = event.target.files[0].size / 1024 / 1024;
      if (this.fileSize > 1) {
        //1mb
        this.fileError = true;
        this.file = 'Profile Image is greater than 1 mb. Please select other';
      }
    } else {
      this.fileError = true;
      this.file = 'Selected File is not .png/.jpg/.jpeg';
    }
  }

  init(company: any) {
    this.hireCandidateForm = new FormGroup({
      jobTitle: new FormControl('', [Validators.required]),
      jobCategory: new FormControl('', [Validators.required]),
      jobType: new FormControl('', [Validators.required]),
      vacancy: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9][0-9]*'),
      ]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      qualification: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      skill: new FormArray([]),
      minSalary: new FormControl('', [Validators.required]),
      maxSalary: new FormControl('', [Validators.required]),
      areas: new FormControl('', [Validators.required]),
      jobDescription: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      companyName: new FormControl('', [Validators.required]),
      personName: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      jobTime: new FormControl('', [Validators.required]),
    });
    //console.log(company);
    this.hireCandidateForm.controls['companyName'].setValue(company.name);
    this.hireCandidateForm.controls['email'].setValue(company.email);
    this.hireCandidateForm.controls['mobileNo'].setValue(company.mobileNo);
  }

  changeTextToUppercase(field: any) {
    const obj = [];
    obj[field] = this.hireCandidateForm.controls[field].value.toUpperCase();
    this.hireCandidateForm.patchValue(obj);
  }

  onStateCity(id: string) {
    if (id) {
      this.commonService.getCity(id).subscribe((res: any) => {
        this.isStateSelected = true;
        this.cityFilter = res[0].cities;
        this.cities = res[0].cities;
      });
    }
  }

  filterState() {
    this.commonService
      .filter(this.hireCandidateForm.value.state, this.states)
      .subscribe((res: any) => {
        this.stateFilter = res;
      });
  }

  filterCity() {
    this.commonService
      .filter(this.hireCandidateForm.value.city, this.cities)
      .subscribe((res: any) => {
        this.cityFilter = res;
      });
  }

  getState(id: string) {
    return <string>this.states.find((state: any) => state.id === id)?.name;
  }
  getCity(id: string) {
    return <string>this.cities.find((city: any) => city.id === id)?.name;
  }

  get skillControl() {
    return (<FormArray>this.hireCandidateForm.get('skill')).controls;
  }
}
