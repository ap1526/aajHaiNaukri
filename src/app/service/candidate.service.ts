import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
// import { AppState } from '../store/appstore/app.state';
// import * as CandidateAction from '../store/candidate/candidate.action';
// import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  constructor(
    private webReqService: WebRequestService
  ) // private store: Store<AppState>
  {}

  uploadResume(data: any) {
    return this.webReqService.post(`uploadResume`, data);
  }

  getResume(mobileNo: string) {
    return this.webReqService.get(`uploadResume/getResumeData/${mobileNo}`);
  }

  updateResume(data: any) {
    return this.webReqService.patch(`uploadResume/updateResume`, data);
  }

  deleteProfile(mobileNo: string, file: any) {
    return this.webReqService.get(`profile/deleteProfile/${mobileNo}/${file}`);
  }

  //delete/update skill and then save
  updateSkill(mobileNo: string, skill: any) {
    return this.webReqService.patch(`uploadResume/updateSkill`, {
      mobileNo,
      skill,
    });
  }

  //delete/update education and then save
  updateEducation(mobileNo: string, education: any) {
    return this.webReqService.patch(`uploadResume/updateEducation`, {
      mobileNo,
      education,
    });
  }

  //delete/update education and then save
  updateSociallink(mobileNo: string, socialLink: any) {
    return this.webReqService.patch(`uploadResume/updateSociallink`, {
      mobileNo,
      socialLink,
    });
  }

  // get single candidate

  getCandidate(mobileNo: string) {
    return this.webReqService.get(`candidateDetails/${mobileNo}`);
  }
}
