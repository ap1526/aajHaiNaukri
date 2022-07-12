import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

declare var jQuery: any;

@Component({
  selector: 'app-candidate-header',
  templateUrl: './candidate-header.component.html',
  styleUrls: ['./candidate-header.component.css'],
})
export class CandidateHeaderComponent implements OnInit {
  isLoginAs!: any;

  constructor(private authService: AuthService, private elem: ElementRef) {}

  ngOnInit(): void {
    this.isLoginAs = sessionStorage.getItem('loginAs');
  }

  logout() {
    this.authService.logout();
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
}
