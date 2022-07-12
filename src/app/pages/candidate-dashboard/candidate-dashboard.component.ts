import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css'],
})
export class CandidateDashboardComponent implements OnInit {
  formModal: any;

  basicinfoForm!: FormGroup;
  // educationForm!: FormGroup;
  // skillForm!: FormGroup;
  // socialLinkForm!: FormGroup;

  isBasicUpdate = false;
  // isEducationUpdate = false;
  // isSkillUpdate = false;
  // isSocialUpdate = false;
  // isSocial = true;

  isLogin: any;
  candidate: any;
  displayprofile!: string;
  name!: string;
  profile!: string;
  profileError: boolean = true;
  profileSize!: number;
  image!: string;

  // skill: string[] = [];
  // mainSkillWithoutFilter: any;
  // mainSkill: any;
  // mainSkillId!: string;
  // subSkillWithoutFilter: any;
  // subSkill: any;
  // subSkillId!: string;
  // skills: any;
  // skillArray = new FormArray([]);
  CityWithoutFilter: any;
  StateWithoutFilter: any;
  states: any;
  cities: any;
  sId!: string;
  cId!: string;

  profileUploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/profile',
  });

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('logedinUser')) {
      this.router.navigate(['/login']);
    } else {
      this.isLogin = sessionStorage.getItem('logedinUser');
      // this.candidateService.getResume(this.isLogin).subscribe((res: any) => {
      //   if (res === null) {
      //     this.toast.error('Please Upload Resume', 'Notification');
      //     this.router.navigate(['/upload-resume']);
      //   } else {
          // this.formModal = new window.bootstrap.Modal(
          //   document.getElementById('myModal')
          // );
          // this.openFormModal();
          // this.candidate = res;
          // this.displayprofile = this.candidate.profileImage;
          // this.name = this.candidate.name;
          // this.init(this.candidate);
        // }
      // });
      this.commonService.getState().subscribe((res: any) => {
        this.states = res;
        this.StateWithoutFilter = res;
      });
    }
  }

  // onBasicInfo() {
  //   this.basicinfoForm.controls['city'].setValue(this.cId);
  //   this.basicinfoForm.controls['state'].setValue(this.sId);

  //   if (this.basicinfoForm.valid) {
  //     this.candidateService
  //       .updateResume(this.basicinfoForm.value)
  //       .subscribe((res: any) => {
  //         this.toast.success('Basic Information Updated', 'Notification');
  //         this.isBasicUpdate = false;
  //         this.ngOnInit();
  //       });
  //   } else {
  //     this.commonService.validateAllFormFields(this.basicinfoForm);
  //     this.toast.error('Basic Information is requied', 'Notification');
  //   }
  // }

  // onUpdateEducation() {
  //   if (this.educationForm.get('education')?.valid) {
  //     let len = this.educationForm.value.education.length;

  //     for (let i = 0; i < len; i++) {
  //       let val =
  //         this.educationForm.value.education[i]['educationTitle'].toUpperCase();
  //       this.educationForm.value.education[i]['educationTitle'] = val;
  //       val = this.educationForm.value.education[i]['grade'].toUpperCase();
  //       this.educationForm.value.education[i]['grade'] = val;
  //       val = this.educationForm.value.education[i]['institute'].toUpperCase();
  //       this.educationForm.value.education[i]['institute'] = val;
  //       val =
  //         this.educationForm.value.education[i]['educationYear'].toUpperCase();
  //       this.educationForm.value.education[i]['educationYear'] = val;
  //     }
  //     this.candidateService
  //       .updateEducation(
  //         this.educationForm.value.mobileNo,
  //         this.educationForm.value.education
  //       )
  //       .subscribe((res: any) => {
  //         this.toast.success('Education Updated', 'Notification');
  //         this.isEducationUpdate = false;
  //       });
  //   } else {
  //     this.commonService.validateAllFormFields(this.educationForm);
  //     this.toast.error('Education is requied', 'Notification');
  //   }
  // }

  // onUpdateSkill() {
  //   this.skillForm.patchValue({
  //     skill: { mainSkillId: this.mainSkillId },
  //   });
  //   this.skillForm.patchValue({ skill: { subSkillId: this.subSkillId } });
  //   //this.updateResume.patchValue({ skill: { skillId: this.skillArray } });

  //   if (this.skillForm.get('skill')?.valid) {
  //     console.log(this.skillForm.value.skill);
  //     this.candidateService
  //       .updateSkill(this.skillForm.value.mobileNo, this.skillForm.value.skill)
  //       .subscribe((res: any) => {
  //         this.toast.success('Skill Updated', 'Notification');
  //         this.isSkillUpdate = false;
  //         this.skill = [];
  //         this.ngOnInit();
  //       });
  //   } else {
  //     this.commonService.validateAllFormFields(this.skillForm);
  //     this.toast.error('Skill is requied', 'Notification');
  //   }
  // }

  // onUpdateSocial() {
  //   //if(this.updateResume.get('socialLink')?.valid){
  //   this.socialLinkForm.value.socialLink['facebook'] =
  //     this.socialLinkForm.value.socialLink['facebook'].toUpperCase();
  //   this.socialLinkForm.value.socialLink['linkedin'] =
  //     this.socialLinkForm.value.socialLink['linkedin'].toUpperCase();
  //   this.socialLinkForm.value.socialLink['instagram'] =
  //     this.socialLinkForm.value.socialLink['instagram'].toUpperCase();

  //   this.candidateService
  //     .updateSociallink(
  //       this.socialLinkForm.value.mobileNo,
  //       this.socialLinkForm.value.socialLink
  //     )
  //     .subscribe((res: any) => {
  //       this.toast.success('Social Link Updated', 'Notification');
  //       this.isSocialUpdate = false;
  //     });
  //   // }else{
  //   //   this.toast.error("Social Link is requied","Notification");
  //   // }
  // }

  // onDeleteEducation(index: any) {
  //   if (confirm('Are You Sure?')) {
  //     (<FormArray>this.educationForm.get('education')).removeAt(index);
  //     //this.onUpdateEducation();
  //   }
  // }

  // onProfileUpload() {
  //   //delete old profile pic
  //   if (this.displayprofile) {
  //     this.candidateService
  //       .deleteProfile(this.basicinfoForm.value.mobileNo, this.displayprofile)
  //       .subscribe((res: any) => {
  //         res;
  //       });
  //   }

  //   this.profileUploader.uploadAll();
  //   this.profileUploader.onCompleteItem = (
  //     item: any,
  //     response: any,
  //     status: any,
  //     headers: any
  //   ) => {
  //     let res = JSON.parse(response);
  //     this.authService
  //       .renameCanFiles({
  //         mobileNo: this.basicinfoForm.value.mobileNo,
  //         profile: res.uploadname,
  //       })
  //       .subscribe((res: any) => {
  //         if (res) {
  //           this.toast.success('Profile Uploaded', 'Notification');
  //           this.profile = '';
  //           this.image = '';
  //           this.isBasicUpdate = false;
  //           this.ngOnInit();
  //         }
  //       });
  //   };
  // }

  // onProfileChange(event: any) {
  //   const file = event.target.files[0];
  //   const types = ['image/png', 'image/jpeg', 'image/jpg'];
  //   if (types.includes(file.type)) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.image = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);

  //     this.profileError = false;
  //     this.profile = file.name;
  //     this.profileSize = event.target.files[0].size / 1024 / 1024;
  //     if (this.profileSize > 1) {
  //       //1mb
  //       this.profileError = true;
  //       this.profile =
  //         'Profile Image is greater than 1 mb. Please select other';
  //     }
  //   } else {
  //     this.profileError = true;
  //     this.profile = 'Selected File is not .png/.jpg/.jpeg';
  //   }
  // }

  // onStateCity(id: string, name: string) {
  //   this.basicinfoForm.controls['state'].setValue(name);
  //   this.sId = id;
  //   if (id) {
  //     this.commonService.getCity(id).subscribe((res: any) => {
  //       this.CityWithoutFilter = res[0].cities;
  //       this.cities = res[0].cities;
  //     });
  //   }
  // }

  // onCity(id: string, name: string) {
  //   this.basicinfoForm.controls['city'].setValue(name);
  //   this.cId = id;
  // }

  // // skill
  // onMainSkill(id: string, name: string) {
  //   //this.mainSkillControl.setValue(name);
  //   this.skillForm.patchValue({ skill: { mainSkillId: name } });
  //   this.mainSkillId = id;

  //   this.commonService.getSubSkill(id).subscribe((res: any) => {
  //     this.subSkill = res;
  //     this.subSkillWithoutFilter = res;
  //   });
  // }

  // onSubSkill(id: string, name: string) {
  //   this.skillForm.patchValue({ skill: { subSkillId: name } });
  //   this.subSkillId = id;

  //   this.commonService.getSkill(id).subscribe((res: any) => {
  //     this.skills = res;
  //   });
  // }

  // onSkill(e: any) {
  //   this.skillArray = this.skillForm.get('skill.skillId') as FormArray;

  //   if (this.skill) {
  //     let len = this.skill.length;
  //     for (let i = 0; i < len; i++) {
  //       this.skillArray.push(new FormControl(this.skill[i]));
  //     }
  //     this.skill = [];
  //   }

  //   if (e.target.checked) {
  //     this.skillArray.push(new FormControl(e.target.value));

  //     console.log(this.skillArray.value);
  //   } else {
  //     const index = this.skillArray.controls.findIndex(
  //       (skillId) => skillId.value === e.target.value
  //     );
  //     console.log(index);
  //     this.skillArray.removeAt(index);

  //     console.log(this.skillArray.value);
  //   }
  // }

  // onAddEducation() {
  //   (<FormArray>this.educationForm.get('education')).push(
  //     new FormGroup({
  //       educationTitle: new FormControl('', [Validators.required]),
  //       grade: new FormControl('', [Validators.required]),
  //       institute: new FormControl('', [Validators.required]),
  //       educationYear: new FormControl('', [
  //         Validators.required,
  //         Validators.pattern('[1-2][0-9]*'),
  //       ]),
  //     })
  //   );
  // }

  // start modal
  openFormModal() {
    this.formModal.show();
  }

  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
  //end modal

  // updateBasic(e: string) {
  //   this.isBasicUpdate = this.update(e);
  // }
  // updateEducation(e: string) {
  //   this.isEducationUpdate = this.update(e);
  // }
  // updateSkill(e: string) {
  //   this.isSkillUpdate = this.update(e);
  // }
  // updateSocial(e: string) {
  //   this.isSocialUpdate = this.update(e);
  //   this.isSocial = true;
  // }

  // update(e: string) {
  //   if (e == 'edit') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // onCity(id: string, name: string) {
  //   this.basicinfoForm.controls['city'].setValue(name);
  //   this.cId = id;
  // }

  // onStateCity(id: string, name: string) {
  //   this.basicinfoForm.controls['state'].setValue(name);
  //   this.sId = id;
  //   if (id) {
  //     this.commonService.getCity(id).subscribe((res: any) => {
  //       this.CityWithoutFilter = res[0].cities;
  //       this.cities = res[0].cities;
  //     });
  //   }
  // }

  // onProfileChange(event: any) {
  //   const file = event.target.files[0];
  //   const types = ['image/png', 'image/jpeg', 'image/jpg'];
  //   if (types.includes(file.type)) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.image = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);

  //     this.profileError = false;
  //     this.profile = file.name;
  //     this.profileSize = event.target.files[0].size / 1024 / 1024;
  //     if (this.profileSize > 1) {
  //       //1mb
  //       this.profileError = true;
  //       this.profile =
  //         'Profile Image is greater than 1 mb. Please select other';
  //     }
  //   } else {
  //     this.profileError = true;
  //     this.profile = 'Selected File is not .png/.jpg/.jpeg';
  //   }
  // }

  // init(candidate: any) {
    //   let educationArray = new FormArray([]);

    // this.basicinfoForm = new FormGroup({
      // name: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z ]*$'),
      // ]),
      // email: new FormControl('', [Validators.required]),
      // profileImage: new FormControl(''),
      // dateOfBirth: new FormControl('', [Validators.required]),
      // mobileNo: new FormControl('', [Validators.required]),
      // address: new FormControl('', [Validators.required]),
      // city: new FormControl('', [Validators.required]),
      // state: new FormControl('', [Validators.required]),
      // gender: new FormControl('', [Validators.required]),
      // description: new FormControl(''),
    // });
    //   this.educationForm = new FormGroup({
    //     education: educationArray,
    //   });
    //   this.skillForm = new FormGroup({
    //     skill: new FormGroup({
    //       skillId: this.skillArray,
    //       subSkillId: new FormControl('', [Validators.required]),
    //       mainSkillId: new FormControl('', [Validators.required]),
    //     }),
    //   });
    //   this.socialLinkForm = new FormGroup({
    //     socialLink: new FormGroup({
    //       linkedin: new FormControl(''),
    //       facebook: new FormControl(''),
    //       instagram: new FormControl(''),
    //     }),
    //   });

    // this.basicinfoForm.controls['name'].setValue(candidate['name']);
    // this.basicinfoForm.controls['email'].setValue(candidate['email']);
    // this.basicinfoForm.controls['mobileNo'].setValue(candidate['mobileNo']);
    // this.basicinfoForm.controls['dateOfBirth'].setValue(
    //   candidate['dateOfBirth']
    // );
    // this.basicinfoForm.controls['address'].setValue(candidate['address']);
    // this.basicinfoForm.controls['gender'].setValue(candidate['gender']);

    //   console.log();
    //   if (
    //     candidate.socialLink.linkedin !== '' &&
    //     candidate.socialLink.facebook !== '' &&
    //     candidate.socialLink.instagram !== ''
    //   ) {
    //     this.isSocial = true;

    //     (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
    //       'linkedin'
    //     ].setValue(candidate.socialLink['linkedin']);

    //     (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
    //       'facebook'
    //     ].setValue(candidate.socialLink['facebook']);

    //     (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
    //       'instagram'
    //     ].setValue(candidate.socialLink['instagram']);
    //   } else {
    //     this.isSocial = false;
    //   }

    // this.commonService.getOneState(candidate['state']).subscribe((res: any) => {
    //   this.basicinfoForm.controls['state'].setValue(res[0].name);
    //   this.onStateCity(candidate['state'], res[0].name);
    // });

    // this.commonService
    //   .getOneCity(candidate['state'], candidate['city'])
    //   .subscribe((res: any) => {
    //     let c = res[0]['cities'];
    //     this.basicinfoForm.controls['city'].setValue(c[0].name);
    //     this.onCity(candidate['city'], c[0].name);
    //   });

    //   if (this.candidate['education']) {
    //     for (let e of candidate['education']) {
    //       educationArray.push(
    //         new FormGroup({
    //           educationTitle: new FormControl(e.educationTitle, [
    //             Validators.required,
    //           ]),
    //           grade: new FormControl(e.grade, [Validators.required]),
    //           institute: new FormControl(e.institute, [Validators.required]),
    //           educationYear: new FormControl(e.educationYear, [
    //             Validators.required,
    //             Validators.pattern('[1-2][0-9]*'),
    //           ]),
    //         })
    //       );
    //     }
    //   }

    //   this.commonService
    //     .getOneMainSkill(candidate['skill']['mainSkillId'])
    //     .subscribe((res: any) => {
    //       this.skillForm.patchValue({
    //         skill: { mainSkillId: res[0].name },
    //       });
    //       this.onMainSkill(res[0]._id, res[0].name);
    //     });

    //   this.commonService
    //     .getOneSubSkill(candidate['skill']['subSkillId'])
    //     .subscribe((res: any) => {
    //       this.skillForm.patchValue({
    //         skill: { subSkillId: res[0].name },
    //       });
    //       this.onSubSkill(res[0]._id, res[0].name);
    //     });

    //   this.skillArray = this.skillForm.get('skill.skillId') as FormArray;
    //   let len = candidate['skill']['skillId'].length;
    //   for (let i = 0; i < len; i++) {
    //     this.commonService
    //       .getOneSkill(candidate['skill']['skillId'][i])
    //       .subscribe((res: any) => {
    //         this.skill.push(res[0]._id);
    //       });
    //   }
  // }

  // changeTextToUppercase(field: any, form: any) {
  //   const obj = [];
  //   obj[field] = form.controls[field].value.toUpperCase();
  //   form.patchValue(obj);
  // }

  // filterSkill(id: string) {
  //   if (this.skill.includes(id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // FilterState() {
  //   this.commonService
  //     .filter(this.basicinfoForm.value.state, this.StateWithoutFilter)
  //     .subscribe((res: any) => {
  //       this.states = res;
  //     });
  // }

  // FilterCity() {
  //   this.commonService
  //     .filter(this.basicinfoForm.value.city, this.CityWithoutFilter)
  //     .subscribe((res: any) => {
  //       this.cities = res;
  //     });
  // }

  // FilterMainSkill() {
  //   if (this.skillForm.value.skill) {
  //     this.commonService
  //       .filter(this.skillForm.value.skill, this.mainSkillWithoutFilter)
  //       .subscribe((res: any) => {
  //         this.mainSkill = res;
  //         // this.mainSkill = res.slice(0, 10); // show first 10 records
  //       });
  //   }
  // }

  // FilterSubSkill() {
  //   if (this.skillForm.value.skill) {
  //     this.commonService
  //       .filter(this.skillForm.value.skill, this.subSkillWithoutFilter)
  //       .subscribe((res: any) => {
  //         this.subSkill = res;
  //         // this.mainSkill = res.slice(0, 10); // show first 10 records
  //       });
  //   }
  // }

  // get skillControl() {
  //   return (<FormArray>this.skillForm.get('skill.skillId')).controls;
  // }

  // get educationControl() {
  //   return (<FormArray>this.educationForm.get('education')).controls;
  // }
}
