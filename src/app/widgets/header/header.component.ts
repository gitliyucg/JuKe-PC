import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../auth.service"
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginState: boolean = false;
  constructor(public authServe: AuthService, public router: Router) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if(localStorage['uid'] !=null || localStorage['uid'] != undefined) {
      this.loginState = true;
    }
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if(localStorage['uid'] !=null || localStorage['uid'] != undefined) {
      this.loginState = true;
    }
  }

  signout() {
    this.loginState = false;
    this.authServe.logout();
    this.router.navigate(['/']);
  }

}
