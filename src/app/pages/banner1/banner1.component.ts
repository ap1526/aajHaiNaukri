import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banner1',
  templateUrl: './banner1.component.html',
  styleUrls: ['./banner1.component.css']
})
export class Banner1Component implements OnInit {

  page!:string;
  name!:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe((url:any)=>{
      this.page=url[0].path;
      if(this.page==='faq'){
        this.name=this.page.toUpperCase();
      }else{
        this.page=this.transform(this.page);
        this.name = this.page.replace(/[-]/g, m => " ");
      }
    })
    
  }

  transform(input:string): string{
        if (!input) {
            return '';
        } else {
            return input.replace(/\b\w/g, first => first.toLocaleUpperCase());
        }
  }

}
