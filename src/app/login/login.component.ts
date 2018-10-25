import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { AuthService} from "../auth.service";
import { Router, ActivatedRoute} from '@angular/router';
import { Md5} from "ts-md5/dist/md5";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginState: boolean;
  formModel: FormGroup;
  url;
  constructor(public http: HttpClient, private authService: AuthService,private fb: FormBuilder, public router: Router, public info: ActivatedRoute) {
    if(info.snapshot.params['url'] == Md5.hashStr('cart'))
    {
      this.url = info.snapshot.params['url'];
    }
    this.formModel = fb.group({
      UserID: ['', Validators.required],
      pass: ['', Validators.required],
      yzm: ['', Validators.required],
      check: [false]
    })
  }

  ngOnInit() {
    $.LoginLoad();
    if (localStorage['uid'] !== null && localStorage['uid'] != undefined) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if($.Login(this.formModel.get('yzm').value) === 'false')
    {
        alert('验证码错误');
        return false;
    }
    this.http.post(sessionStorage['http'] + '/action/Login/SignIn2',this.formModel.value).subscribe(data => {
      if(data['WebClose'] == "1")
      {
        alert("网站维护中，请耐心等待");
        return false;
      }
      localStorage.setItem('uid', data['Id']);
      localStorage.setItem('un', data['UserID']);
      localStorage.setItem('IsBaoDan', data['IsBaoDan']);
      localStorage.setItem('CID', data['CID']);
      localStorage.setItem('BanDanCenter', data['BanDanCenter'] == null ? '0000' : data['BanDanCenter']);
      localStorage.setItem('Name', data['Name']);
      localStorage.setItem('Mobile', data['Mobile']);
      localStorage.setItem('WebClose', data['WebClose']);
      localStorage.setItem('IsTransfer', data['IsTransfer']);
      localStorage.setItem('IsWithdraw', data['IsWithdraw']);
      this.loginState = true;
      this.authService.login().subscribe(() => {
        if (this.authService.isLoggedIn) {
          if(this.url)
          {
            this.router.navigate(['/'+this.url]);
          }else {
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/index';
            this.router.navigate([redirect]);
          }

        }
      });
    },error => {
      alert(error.error.Message);
    });
  }
}
