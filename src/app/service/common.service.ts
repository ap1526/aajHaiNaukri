import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private webReqService: WebRequestService) {}

  getProfileUrl(img: string) {
    return this.webReqService.get(`getProfileImage/${img}`);
  }

  getState() {
    return this.webReqService.get(`get_only_state`);
  }

  getOneState(id: any) {
    return this.webReqService.get(`get_only_state/${id}`);
  }

  getAllCity() {
    this.webReqService.get(`getAllCities`).subscribe((res: any) => {
      return res;
    });
  }

  getCity(state: any) {
    return this.webReqService.get(`get_city_from_state/${state}`);
  }

  getOneCity(stateId: any, cityId: any) {
    return this.webReqService.get(`get_city_from_state/${stateId}/${cityId}`);
  }

  getMainSkill() {
    return this.webReqService.get(`skill/mainSkill`);
  }

  getOneMainSkill(id: string) {
    return this.webReqService.get(`skill/getMainSkill/${id}`);
  }

  getSubSkill(id: string) {
    return this.webReqService.get(`skill/subSkill/${id}`);
  }

  getOneSubSkill(id: string) {
    return this.webReqService.get(`skill/getSubSkill/${id}`);
  }

  getSkill(id: string) {
    return this.webReqService.get(`skill/skills/${id}`);
  }

  getOneSkill(id: string) {
    return this.webReqService.get(`skill/getSkill/${id}`);
  }

  filter(name: string, listFilter: any): Observable<any> {
    var filter = name;
   
    return of(
      listFilter.filter(function (el: any) {
        return el.name
          .toString()
          .toLowerCase()
          .includes(filter.toString().trim().toLowerCase());
      })
    );
  }

  checkMobile(mobile: string, list: any) {
    return of(
      list.filter(function (el: any) {
        return el.toString().includes(mobile.toString().trim());
      })
    );
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}

//get only city name

// <!-- <a style="font-size: 15px;color: black;" *ngFor="let s of states">
//     <p *ngFor="let c of s.cities">{{c.name}}</p>
// </a> -->
