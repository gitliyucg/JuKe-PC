import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  model;
  isbaodan: boolean = false;
  IsTransfer: boolean = false;
  IsWithdraw: boolean = false;
  CID: boolean = true;
  constructor(public http: HttpClient) {
    if(localStorage['IsBaoDan'] == '1') {
      this.isbaodan = true;
    }
    if(localStorage['IsTransfer'] == '1') {
      this.IsTransfer = true;
    }
    if(localStorage['IsWithdraw'] == '1') {
      this.IsWithdraw = true;
    }
  }

  ngOnInit() {
  }

}
