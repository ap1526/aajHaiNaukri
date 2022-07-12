import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CandidateDashboardComponent } from './pages/candidate-dashboard/candidate-dashboard.component';
import { CandidateDetailsComponent } from './pages/candidate-details/candidate-details.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyRegisterComponent } from './pages/company-register/company-register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CandidateRegisterComponent } from './pages/candidate-register/candidate-register.component';
import { ErrorComponent } from './pages/error/error.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FavouriteJobComponent } from './pages/favourite-job/favourite-job.component';
import { HomeComponent } from './pages/home/home.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { LoginComponent } from './pages/login/login.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleProfileComponent } from './pages/single-profile/single-profile.component';
import { SingleResumeComponent } from './pages/single-resume/single-resume.component';
import { SubmitResumeComponent } from './pages/submit-resume/submit-resume.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { CompanyHomeComponent } from './pages/company-home/company-home.component';
import { HireCandidateComponent } from './pages/hire-candidate/hire-candidate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'job-list', component: JobListComponent },
  { path: 'favourite-job', component: FavouriteJobComponent },
  { path: 'job-details', component: JobDetailsComponent },
  { path: 'hire-candidate', component: HireCandidateComponent },
  { path: 'candidate-list', component: CandidateListComponent },
  { path: 'candidate-details', component: CandidateDetailsComponent },
  { path: 'candidate-register', component: CandidateRegisterComponent },
  { path: 'candidate-dashboard', component: CandidateDashboardComponent },
  { path: 'single-resume', component: SingleResumeComponent },
  { path: 'upload-resume', component: SubmitResumeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-details', component: BlogDetailsComponent },
  { path: 'company-register', component: CompanyRegisterComponent },
  { path: 'company-list', component: CompanyListComponent },
  { path: 'company-home', component: CompanyHomeComponent },
  { path: 'company-details', component: CompanyDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'single-profile', component: SingleProfileComponent },
  { path: '404', component: ErrorComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
