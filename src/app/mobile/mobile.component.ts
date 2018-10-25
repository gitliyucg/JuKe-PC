import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    $('footer').hide();
  }

}
