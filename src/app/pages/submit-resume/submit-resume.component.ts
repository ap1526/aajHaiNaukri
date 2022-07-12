import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city.model';
import { MainSkill } from 'src/app/models/main-skill.model';
import { Skill } from 'src/app/models/skill.model';
import { State } from 'src/app/models/state.model';
import { SubSkill } from 'src/app/models/sub-skill.model';
import { AuthService } from 'src/app/service/auth.service';
import { CandidateService } from 'src/app/service/candidate.service';
import { CommonService } from 'src/app/service/common.service';

declare var window: any;
declare var jQuery: any;

@Component({
  selector: 'app-submit-resume',
  templateUrl: './submit-resume.component.html',
  styleUrls: ['./submit-resume.component.css'],
})
export class SubmitResumeComponent implements OnInit {
  gender = ['MALE', 'FEMALE'];
  selectedState!: string;
  selectedCity!: string;
  selectedMainSkill!: string;
  selectedSubSkill!: string;

  isLogin: any;
  isResumeUploaded = false;
  candidate: any;
  resumeForm!: FormGroup;
  form!: any;

  mainSkillFilter: MainSkill[] = [];
  mainSkill: MainSkill[] = [];
  subSkillFilter: SubSkill[] = [];
  subSkill: SubSkill[] = [];
  allSkill: Skill[] = [];
  skillError!: string;
  educationError!: string;
  Keywords: string[] = [];
  keywordInput!: string;
  states: State[] = [];
  stateFilter: State[] = [];
  cities: City[] = [];
  cityFilter: City[] = [];

  maxlenError = false; // add education max length error

  image!: string;
  profile!: string;
  profileError = false;
  profileSize!: number;

  //if resume uploaded
  basicinfoForm!: FormGroup;
  educationForm!: FormGroup;
  skillForm!: FormGroup;
  socialLinkForm!: FormGroup;

  isBasicUpdate = false;
  isEducationUpdate = false;
  isSkillUpdate = false;
  isSocialUpdate = false;
  isSocial = true;

  skill: string[] = [];
  skillArray = new FormArray([]);

  displayprofile!: string;
  name!: string;

  profileUploader: FileUploader = new FileUploader({
    url: 'http://192.168.1.111:3000/profile',
  });

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private commonService: CommonService,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('logedinUser')) {
      this.router.navigate(['/login']);
    } else {
      this.isLogin = sessionStorage.getItem('logedinUser');
      this.candidateService.getResume(this.isLogin).subscribe((res: any) => {
        if (res) {
          this.isResumeUploaded = true;
          this.candidate = res;
          this.displayprofile = this.candidate.profileImage;
          this.name = this.candidate.name;
          this.initUploadedResume(this.candidate);
          var keywordCount = jQuery('.keywords-list').children('span');
          // console.log(keywordCount);
          if (keywordCount > 0) {
            jQuery('.keywords-list')
              .css({ height: 'auto !important' })
              .height();
          }
        } else {
          this.candidateService
            .getCandidate(this.isLogin)
            .subscribe((res: any) => {
              this.candidate = res[0];
              this.form = this.resumeForm;
              this.init();

              this.resumeForm.controls['name'].setValue(this.candidate['name']);
              this.resumeForm.controls['email'].setValue(
                this.candidate['email']
              );
              this.resumeForm.controls['mobileNo'].setValue(
                this.candidate['mobileNo']
              );
              this.resumeForm.controls['address'].setValue(
                this.candidate['address']
              );
              this.profile = this.candidate['profileImage'];
            });
        }
      });

      this.commonService.getMainSkill().subscribe((res: any) => {
        this.mainSkill = res;
        this.mainSkillFilter = res;
      });
      this.commonService.getState().subscribe((res: any) => {
        this.states = res;
        this.stateFilter = res;
      });
    }
  }

  onSave() {
    // uppercase skill ,social link and eduction
    if (this.resumeForm.valid) {
      let educationlen = this.resumeForm.value.education.length;
      for (let i = 0; i < educationlen; i++) {
        let val =
          this.resumeForm.value.education[i]['educationTitle'].toUpperCase();
        this.resumeForm.value.education[i]['educationTitle'] = val;
        val = this.resumeForm.value.education[i]['grade'].toUpperCase();
        this.resumeForm.value.education[i]['grade'] = val;
        val = this.resumeForm.value.education[i]['institute'].toUpperCase();
        this.resumeForm.value.education[i]['institute'] = val;
        val = this.resumeForm.value.education[i]['educationYear'].toUpperCase();
        this.resumeForm.value.education[i]['educationYear'] = val;
      }

      this.resumeForm.value.socialLink['facebook'] =
        this.resumeForm.value.socialLink['facebook'].toUpperCase();
      this.resumeForm.value.socialLink['linkedin'] =
        this.resumeForm.value.socialLink['linkedin'].toUpperCase();
      this.resumeForm.value.socialLink['instagram'] =
        this.resumeForm.value.socialLink['instagram'].toUpperCase();

      this.resumeForm.value.uploadedProfile = this.profile;

      // console.log(this.resumeForm.value);

      this.profileUploader.uploadAll(); // upload profile
      this.profileUploader.onCompleteItem = (
        item: any,
        response: any,
        status: any,
        headers: any
      ) => {
        // console.log(response);
        let res = JSON.parse(response);
        this.authService
          .renameCanFiles({
            mobileNo: this.resumeForm.value.mobileNo,
            profile: res.uploadname,
          })
          .subscribe((res: any) => {
            res;
          });
      };

      this.candidateService
        .uploadResume(this.resumeForm.value)
        .subscribe((res: any) => {
          // console.log(res);
          if (res === 'done') {
            this.toast.success('Resume Submitted', 'Notification');
            this.isResumeUploaded = true;
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.toast.error(res.message, 'Notification');
          }
        });
    } else {
      if (this.resumeForm.get('skill')?.invalid) {
        this.skillError = 'Skill is requied';
      }
      if (this.resumeForm.get('education')?.invalid) {
        this.educationError = 'Education is requied';
      }
      this.commonService.validateAllFormFields(this.resumeForm);
    }
  }

  //get file name
  onProfileChange(event: any) {
    const file = event.target.files[0];
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    if (types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.profileError = false;
      this.profile = file.name;
      this.profileSize = event.target.files[0].size / 1024 / 1024;
      if (this.profileSize > 1) {
        //1mb
        this.profileError = true;
        this.profile =
          'Profile Image is greater than 1 mb. Please select other';
      }
    } else {
      this.profileError = true;
      this.profile = 'Selected File is not .png/.jpg/.jpeg';
    }
  }

  onStateCity(id: string) {
    if (id) {
      this.commonService.getCity(id).subscribe((res: any) => {
        this.cities = res[0].cities;
        this.cityFilter = res[0].cities;
      });
    }
  }

  // skill
  onMainSkill(id: string) {
    //this.mainSkillControl.setValue(name);

    this.commonService.getSubSkill(id).subscribe((res: any) => {
      this.subSkill = res;
      this.subSkillFilter = res;
    });
  }

  onAddEducation() {
    // if(this.resumeForm.value.education.length<3){  // only 3 object enter
    this.form = this.isResumeUploaded ? this.educationForm : this.resumeForm;

    (<FormArray>this.form.get('education')).push(
      new FormGroup({
        educationTitle: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required]),
        institute: new FormControl('', [Validators.required]),
        educationYear: new FormControl('', [
          Validators.required,
          Validators.pattern('[1-2][0-9]*'),
        ]),
      })
    );
    // }else{
    //   this.maxlenError=true;
    //   (<HTMLInputElement> document.getElementById("addEducation")).disabled = true;
    // }
  }

  onDeleteEducation(index: number) {
    if (confirm('Are You Sure?')) {
      if (this.isResumeUploaded) {
        (<FormArray>this.educationForm.get('education')).removeAt(index);
        this.onUpdateEducation();
      } else {
        (<FormArray>this.resumeForm.get('education')).removeAt(index);
      }
    }
  }

  storeKeyword(event: any) {
    this.keywordInput = event.target.value.toUpperCase();
  }

  AddKeyword() {
    let skill: any;
    if (this.isResumeUploaded) {
      skill = this.skillForm.get('skill.skills') as FormArray;
      if (skill) {
        this.skillArray = skill;
      }
    } else {
      skill = this.resumeForm.get('skill.skills') as FormArray;
      if (skill) {
        this.skillArray = skill;
      }
    }
    console.log(this.keywordInput);
    if (this.keywordInput) {
      this.skillArray.push(new FormControl(this.keywordInput));
      this.Keywords.push(this.keywordInput);

      //  this.keywordChangeCss()
      var heightnow = jQuery('.keywords-list').height();
      // console.log(heightnow);
      var heightfull = jQuery('.keywords-list')
        .css({ 'max-height': 'auto', height: 'auto' })
        .height();
      // console.log(heightfull);
      jQuery('.keywords-list')
        .css({ height: heightnow })
        .animate({ height: heightfull }, 200);
      jQuery('.keyword-input').val('');
      this.keywordInput = '';
    } else {
      return;
    }
  }

  RemoveKeyword(Rkeyword: string) {
    // console.log(Rkeyword);
    const index: number = this.Keywords.indexOf(Rkeyword);
    // console.log(index);
    if (index !== -1) {
      this.Keywords.splice(index, 1);
      this.skillArray.removeAt(index);
    }
    jQuery('.keywords-list').css({ height: 'auto' }).height();
  }

  keywordChangeCss() {
    var heightnow = jQuery('.keywords-list').height();

    var heightfull = jQuery('.keywords-list')
      .css({ 'max-height': 'auto', height: 'auto' })
      .height();

    console.log(heightnow);
    console.log(heightfull);
    jQuery('.keywords-list')
      .css({ height: heightfull })
      .animate({ height: heightfull }, 200);

    // jQuery(window).on('resize', function () {
    //   jQuery(".keywords-list").css({ 'height': 'auto' }).height();
    // });

    // jQuery(window).on('load', function () {
    //   console.log("load")
    //     var keywordCount = jQuery('.keywords-list').children("span").length;
    //     if (keywordCount > 0) { keywordsList.css({ 'height': 'auto' }).height(); }
    // });
  }

  init() {
    this.resumeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      email: new FormControl('', [Validators.required]),
      profileImage: new FormControl(''),
      uploadedProfile: new FormControl(''),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      education: new FormArray([], [Validators.required]),
      skill: new FormGroup({
        skills: this.skillArray,
        subSkillId: new FormControl('', [Validators.required]),
        mainSkillId: new FormControl('', [Validators.required]),
      }),
      socialLink: new FormGroup({
        linkedin: new FormControl(''),
        facebook: new FormControl(''),
        instagram: new FormControl(''),
      }),
    });
  }

  filterState() {
    // console.log(this.basicinfoForm.controls['state'].value);
    this.form = this.isResumeUploaded ? this.basicinfoForm : this.resumeForm;
    // console.log(this.form.value.state);
    this.commonService
      .filter(this.form.controls['state'].value, this.states)
      .subscribe((res: any) => {
        this.stateFilter = res;
      });
    //console.log(this.stateFilter);
  }
  filterCity() {
    // console.log(this.basicinfoForm.controls['city'].value);
    this.form = this.isResumeUploaded ? this.basicinfoForm : this.resumeForm;
    this.commonService
      .filter(this.form.controls['city'].value, this.cities)
      .subscribe((res: any) => {
        this.cityFilter = res;
      });
    // console.log(this.cityFilter);
  }

  changeTextToUppercase(field: any) {
    this.form = this.isResumeUploaded ? this.basicinfoForm : this.resumeForm;
    const obj = [];
    obj[field] = this.form.controls[field].value.toUpperCase();
    this.form.patchValue(obj);
  }

  FilterMainSkill() {
    this.form = this.isResumeUploaded ? this.skillForm : this.resumeForm;

    this.commonService
      .filter(this.form.value.skill['mainSkillId'], this.mainSkill)
      .subscribe((res: any) => {
        this.mainSkillFilter = res;
        // this.mainSkill = res.slice(0, 10); // show first 10 records
      });
  }

  FilterSubSkill() {
    this.form = this.isResumeUploaded ? this.skillForm : this.resumeForm;

    this.commonService
      .filter(this.form.value.skill['subSkillId'], this.subSkill)
      .subscribe((res: any) => {
        this.subSkillFilter = res;
      });
    //}
  }

  getCity(id: string) {
    return <string>this.cities.find((city) => city.id === id)?.name;
  }
  getState(id: string) {
    return <string>this.states.find((state) => state.id === id)?.name;
  }

  getMainSkill(id: string) {
    return <string>this.mainSkill.find((skill) => skill._id === id)?.name;
  }

  getSubSkill(id: string) {
    return <string>this.subSkill.find((skill) => skill._id === id)?.name;
  }

  get skillControl() {
    return <FormArray>this.resumeForm.get('skill.skillId');
  }

  get educationControl() {
    return <FormArray>this.resumeForm.get('education');
  }

  //-------------- for uploaded resume ---------------------

  //update basic information
  onBasicInfo() {
    // this.basicinfoForm.controls['city'].setValue(this.cId);
    // this.basicinfoForm.controls['state'].setValue(this.sId);

    if (this.basicinfoForm.valid) {
      this.candidateService
        .updateResume(this.basicinfoForm.value)
        .subscribe((res: any) => {
          if (res === 'done') {
            this.toast.success('Basic Information Updated', 'Notification');
            this.isBasicUpdate = false;
            this.ngOnInit();
          } else {
            this.toast.error(res, 'Notification');
          }
        });
    } else {
      this.commonService.validateAllFormFields(this.basicinfoForm);
      this.toast.error('Basic Information is requied', 'Notification');
    }
  }

  //update education
  onUpdateEducation() {
    if (this.educationForm.get('education')?.valid) {
      let len = this.educationForm.value.education.length;

      for (let i = 0; i < len; i++) {
        let val =
          this.educationForm.value.education[i]['educationTitle'].toUpperCase();
        this.educationForm.value.education[i]['educationTitle'] = val;
        val = this.educationForm.value.education[i]['grade'].toUpperCase();
        this.educationForm.value.education[i]['grade'] = val;
        val = this.educationForm.value.education[i]['institute'].toUpperCase();
        this.educationForm.value.education[i]['institute'] = val;
        val =
          this.educationForm.value.education[i]['educationYear'].toUpperCase();
        this.educationForm.value.education[i]['educationYear'] = val;
      }
      this.candidateService
        .updateEducation(
          this.basicinfoForm.value.mobileNo,
          this.educationForm.value.education
        )
        .subscribe((res: any) => {
          if (res === 'done') {
            this.toast.success('Education Updated', 'Notification');
            this.isEducationUpdate = false;
          } else {
            this.toast.error(res, 'Notification');
          }
        });
    } else {
      this.commonService.validateAllFormFields(this.educationForm);
      this.toast.error('Education is requied', 'Notification');
    }
  }

  //update skill
  onUpdateSkill() {
    if (this.skillForm.get('skill')?.valid) {
      // console.log(this.skillForm.value.skill);
      this.candidateService
        .updateSkill(
          this.basicinfoForm.value.mobileNo,
          this.skillForm.value.skill
        )
        .subscribe((res: any) => {
          if (res === 'done') {
            this.toast.success('Skill Updated', 'Notification');
            this.isSkillUpdate = false;
            this.Keywords = [];
            this.resetArray();
            this.ngOnInit();
          } else {
            this.toast.error(res, 'Notification');
          }
        });
    } else {
      this.commonService.validateAllFormFields(this.skillForm);
      this.toast.error('Skill is requied', 'Notification');
    }
  }

  //update social link
  onUpdateSocial() {
    //if(this.updateResume.get('socialLink')?.valid){
    this.socialLinkForm.value.socialLink['facebook'] =
      this.socialLinkForm.value.socialLink['facebook'].toUpperCase();
    this.socialLinkForm.value.socialLink['linkedin'] =
      this.socialLinkForm.value.socialLink['linkedin'].toUpperCase();
    this.socialLinkForm.value.socialLink['instagram'] =
      this.socialLinkForm.value.socialLink['instagram'].toUpperCase();

    this.candidateService
      .updateSociallink(
        this.basicinfoForm.value.mobileNo,
        this.socialLinkForm.value.socialLink
      )
      .subscribe((res: any) => {
        if (res === 'done') {
          this.toast.success('Social Link Updated', 'Notification');
          this.isSocialUpdate = false;
        } else {
          this.toast.error(res, 'Notification');
        }
      });
  }

  //upload profile
  onProfileUpload() {
    //delete old profile pic
    if (this.displayprofile) {
      this.candidateService
        .deleteProfile(this.basicinfoForm.value.mobileNo, this.displayprofile)
        .subscribe((res: any) => {
          res;
        });
    }

    this.profileUploader.uploadAll();
    this.profileUploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      let res = JSON.parse(response);
      this.authService
        .renameCanFiles({
          mobileNo: this.basicinfoForm.value.mobileNo,
          profile: res.uploadname,
        })
        .subscribe((res: any) => {
          if (res) {
            this.toast.success('Profile Uploaded', 'Notification');
            this.profile = '';
            this.image = '';
            this.isBasicUpdate = false;
            this.ngOnInit();
          }
        });
    };
  }

  updateBasic(e: string) {
    this.isBasicUpdate = this.update(e);
    this.form = this.basicinfoForm;
    if (this.isBasicUpdate) {
      console.log(this.selectedState);
      this.basicinfoForm.controls['state'].setValue(this.selectedState);
      this.basicinfoForm.controls['city'].setValue(this.selectedCity);
    }
  }
  updateEducation(e: string) {
    this.isEducationUpdate = this.update(e);
  }
  updateSkill(e: string) {
    this.isSkillUpdate = this.update(e);

    if (this.isSkillUpdate) {
      this.skillForm.patchValue({
        skill: { mainSkillId: this.selectedMainSkill },
      });
      this.skillForm.patchValue({
        skill: { subSkillId: this.selectedSubSkill },
      });
    } else {
      this.Keywords = [];
      this.initUploadedResume(this.candidate);
    }
  }
  updateSocial(e: string) {
    this.isSocialUpdate = this.update(e);
    this.isSocial = this.isSocialUpdate ? true : false;
  }

  update(e: string) {
    if (e == 'edit') {
      return true;
    } else {
      return false;
    }
  }

  initUploadedResume(candidate: any) {
    let educationArray = new FormArray([]);

    this.basicinfoForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      email: new FormControl('', [Validators.required]),
      profileImage: new FormControl(''),
      dateOfBirth: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });

    this.basicinfoForm.controls['name'].setValue(candidate['name']);
    this.basicinfoForm.controls['email'].setValue(candidate['email']);
    this.basicinfoForm.controls['mobileNo'].setValue(candidate['mobileNo']);
    this.basicinfoForm.controls['dateOfBirth'].setValue(
      candidate['dateOfBirth']
    );
    this.basicinfoForm.controls['address'].setValue(candidate['address']);
    this.basicinfoForm.controls['gender'].setValue(candidate['gender']);

    this.commonService.getOneState(candidate['state']).subscribe((res: any) => {
      this.basicinfoForm.controls['state'].setValue(res[0].name);
      this.selectedState = res[0].id;
      this.onStateCity(candidate['state']);
    });

    this.commonService
      .getOneCity(candidate['state'], candidate['city'])
      .subscribe((res: any) => {
        let c = res[0]['cities'];
        this.basicinfoForm.controls['city'].setValue(c[0].name);
        this.selectedCity = c[0].id;
      });

    this.educationForm = new FormGroup({
      education: educationArray,
    });

    if (this.candidate['education']) {
      for (let e of candidate['education']) {
        educationArray.push(
          new FormGroup({
            educationTitle: new FormControl(e.educationTitle, [
              Validators.required,
            ]),
            grade: new FormControl(e.grade, [Validators.required]),
            institute: new FormControl(e.institute, [Validators.required]),
            educationYear: new FormControl(e.educationYear, [
              Validators.required,
              Validators.pattern('[1-2][0-9]*'),
            ]),
          })
        );
      }
    }

    this.skillForm = new FormGroup({
      skill: new FormGroup({
        skills: this.skillArray,
        subSkillId: new FormControl('', [Validators.required]),
        mainSkillId: new FormControl('', [Validators.required]),
      }),
    });

    this.commonService
      .getOneMainSkill(candidate['skill']['mainSkillId'])
      .subscribe((res: any) => {
        this.skillForm.patchValue({
          skill: { mainSkillId: res[0].name },
        });
        this.selectedMainSkill = res[0]._id;
        this.onMainSkill(res[0]._id);
      });

    this.commonService
      .getOneSubSkill(candidate['skill']['subSkillId'])
      .subscribe((res: any) => {
        this.skillForm.patchValue({
          skill: { subSkillId: res[0].name },
        });
        this.selectedSubSkill = res[0]._id;
      });

    this.skillArray = this.skillForm.get('skill.skills') as FormArray;
    let len = candidate['skill']['skills'].length;

    for (let i = 0; i < len; i++) {
      this.skillArray.push(new FormControl(candidate['skill']['skills'][i]));
      this.Keywords.push(candidate['skill']['skills'][i]);
    }
    jQuery('.keywords-list').css({ height: 'auto' }).height();

    this.socialLinkForm = new FormGroup({
      socialLink: new FormGroup({
        linkedin: new FormControl(''),
        facebook: new FormControl(''),
        instagram: new FormControl(''),
      }),
    });

    if (
      candidate.socialLink.linkedin !== '' &&
      candidate.socialLink.facebook !== '' &&
      candidate.socialLink.instagram !== ''
    ) {
      this.isSocial = true;

      (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
        'linkedin'
      ].setValue(candidate.socialLink['linkedin']);

      (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
        'facebook'
      ].setValue(candidate.socialLink['facebook']);

      (<FormGroup>this.socialLinkForm.controls['socialLink']).controls[
        'instagram'
      ].setValue(candidate.socialLink['instagram']);
    } else {
      this.isSocial = false;
    }
  }

  displayState(state: any) {
    console.log(state);
    return state ? state.name : undefined;
  }

  filterSkill(id: string) {
    if (this.skill.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  resetArray() {
    const arr = this.skillForm.get('skill.skills') as FormArray;
    while (0 !== arr.length) {
      arr.removeAt(0);
    }
  }

  get UploadSkillControl() {
    return (<FormArray>this.skillForm.get('skill.skillId')).controls;
  }

  get uploadedEducationControl() {
    return (<FormArray>this.educationForm.get('education')).controls;
  }
}
