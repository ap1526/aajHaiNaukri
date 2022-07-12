import { Component, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private elem: ElementRef) {}
  ngAfterViewInit() {
    var a = this.elem.nativeElement.querySelectorAll('.mean-menu');
    jQuery(a).meanmenu({
      meanScreenWidth: '991',
    });
  }
}
