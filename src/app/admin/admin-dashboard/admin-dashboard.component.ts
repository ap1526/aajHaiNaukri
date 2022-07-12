import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  isLogin: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('logedinUser')) {
      this.router.navigate(['/admin/login']);
    } else {
      this.isLogin = sessionStorage.getItem('logedinUser');
    }
  }

  logout() {
    this.router.navigate(['/admin/login']);
    sessionStorage.removeItem('logedinUser');
  }
}
