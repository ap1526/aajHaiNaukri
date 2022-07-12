import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

declare var jQuery: any;

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css'],
})
export class CompanyHeaderComponent implements OnInit {
  isLoginAs!: any;

  constructor(private authService: AuthService, private elem: ElementRef) {}

  ngOnInit(): void {
    this.isLoginAs = sessionStorage.getItem('loginAs');
  }

  ngAfterViewInit() {
    var a = this.elem.nativeElement.querySelectorAll('.mean-menu');

    jQuery(a).meanmenu({
      meanScreenWidth: '991',
    });

    const navbarToggler = this.elem.nativeElement.querySelector('.clsbtn');
    navbarToggler.addEventListener('click', () => {
      this.logout();
    });
  }

  logout() {
    this.authService.logout();
  }
}
