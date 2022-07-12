import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL: any;
  constructor(public http: HttpClient) {
    this.ROOT_URL = 'http://192.168.1.111:3000';
    //this.ROOT_URL = 'http://127.0.0.1:3000';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  post(url: string, payload: object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }

  patch(url: string, payload: object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }

  // delete(url:string){
  //   return this.http.delete(`${this.ROOT_URL}/${url}`);
  // }

  login(data: any) {
    return this.http.post(`${this.ROOT_URL}/login`, data, {
      observe: 'response',
    });
  }

  send_otp(data: any) {
    return this.http.post(`${this.ROOT_URL}/send_otp`, data, {
      observe: 'response',
    });
  }

  signup(data: any) {
    //candidate signup
    return this.http.post(`${this.ROOT_URL}/signUp`, data, {
      observe: 'response',
    });
  }

  companySignup(data: any) {
    return this.http.post(`${this.ROOT_URL}/company/signUp`, data, {
      observe: 'response',
    });
  }
}
