import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgOtpInputModule } from 'ng-otp-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './pages/candidate-details/candidate-details.component';
import { SingleResumeComponent } from './pages/single-resume/single-resume.component';
import { SubmitResumeComponent } from './pages/submit-resume/submit-resume.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleProfileComponent } from './pages/single-profile/single-profile.component';
import { ErrorComponent } from './pages/error/error.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BannerComponent } from './pages/banner/banner.component';
import { Banner1Component } from './pages/banner1/banner1.component';
import { CommonModule } from '@angular/common';
import { FavouriteJobComponent } from './pages/favourite-job/favourite-job.component';
import { CandidateDashboardComponent } from './pages/candidate-dashboard/candidate-dashboard.component';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';
import { CandidateRegisterComponent } from './pages/candidate-register/candidate-register.component';
import { CompanyHomeComponent } from './pages/company-home/company-home.component';
import { CandidateHeaderComponent } from './pages/candidate-header/candidate-header.component';
import { CompanyHeaderComponent } from './pages/company-header/company-header.component';
import { HireCandidateComponent } from './pages/hire-candidate/hire-candidate.component';
import { AdminModule } from './admin/admin.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import * as fromApp from './store/appstore/app.state';

import {
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'rgba(8,98,177,0.08)',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  fgsColor: 'rgba(241,245,249,0.98)',
  bgsOpacity: 0.5,
  overlayColor: '#0862b1',
  pbColor: '#ffffff',
  textColor: '#FFFFFF',
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    JobListComponent,
    JobDetailsComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
    SingleResumeComponent,
    SubmitResumeComponent,
    PricingComponent,
    CandidateDashboardComponent,
    BlogComponent,
    BlogDetailsComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    LoginComponent,
    CreateAccountComponent,
    ProfileComponent,
    SingleProfileComponent,
    ErrorComponent,
    FaqComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    Banner1Component,
    FavouriteJobComponent,
    CandidateDashboardComponent,
    CandidateRegisterComponent,
    CompanyRegisterComponent,
    CompanyHomeComponent,
    CandidateHeaderComponent,
    CompanyHeaderComponent,
    HireCandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    FileUploadModule,
    CountdownModule,
    AdminModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right' }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule, // import NgxUiLoaderHttpModule. By default, it will show background loader.
    // If you need to show foreground spinner, do as follow:
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    MaterialModule,
    NgxMatSelectSearchModule,
    //StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
