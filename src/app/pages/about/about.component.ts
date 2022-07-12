import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLoginAs!:any;

  constructor() { 
  }

  ngOnInit(): void {
    this.isLoginAs=sessionStorage.getItem('loginAs');
    console.log(this.isLoginAs);
  }

}
