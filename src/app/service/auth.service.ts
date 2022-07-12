import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private webReqService:WebRequestService,private router:Router) { }

  //  All Mobile No to check enter mobileNo is exist or not
  allMobileNo(){
    return this.webReqService.get('exist/mobileNo');
  }

  // Admin Signup and Login
  adminSignup(data:any){
    return this.webReqService.post(`admin/signUp`,data);
  }

  adminLogin(data:any){
    return this.webReqService.post(`admin/login`,data);
  }
  

  // authentication of Candidate and company
  candidateSignup(data:any){
    return this.webReqService.signup(data);
  }

  //rename uploaded file
  renameCanFiles(data:any){
    return this.webReqService.patch('renameFiles',data);
  }

  companySignup(data:any){
    return this.webReqService.companySignup(data);
  }

  //rename uploaded file
  renameCmpFiles(data:any){
    return this.webReqService.patch('renamelogo',data);
  }

  login(as:string,mobileNo:string){
    return this.webReqService.login({as,mobileNo});
  }

  otp(data:any){
    return this.webReqService.send_otp(data);
  }

  logout(){
    sessionStorage.removeItem('logedinUser');
    sessionStorage.removeItem('loginAs');
    this.router.navigate(['/login'])
  }

}
