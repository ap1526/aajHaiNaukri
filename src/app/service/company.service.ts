import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private webReqService: WebRequestService) {}

  getCompany(mobileNo: string) {
    return this.webReqService.get(`company/companyDetails/${mobileNo}`);
  }
}
