import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Location} from '@angular/common';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {
  formModel: FormGroup;
  constructor(public http: HttpClient, public fb: FormBuilder, public location: Location) {
    this.formModel = fb.group({
      un: [localStorage['un']],
      pass: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.get(sessionStorage['http']+'/action/users/VerifyPass?un='+this.formModel.value.un+'&pass='+this.formModel.value.pass, {responseType: 'text' as 'json'}).subscribe(data => {
      if(data == 'true') {
        sessionStorage['pass2'] = true;
        this.location.back();
      }else {
        alert('密码错误');
      }
    });
  }

}
