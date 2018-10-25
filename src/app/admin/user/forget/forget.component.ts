import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

    public time: number = 60;
    public ObtainInformation: string = '获取验证码'
    public show: boolean;
    public ID: number;
    public UN: string;
    public formMobel: FormGroup;
    public phoneState: string;
    phone: any;
    public Verification;
    verification: any;

    constructor(
        public fb: FormBuilder,
        public http: Http,
        public router: Router
    ) {
        this.formMobel = fb.group({
            phone: ['', [Validators.required, Validators.pattern('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$')]],
            verification: ['', Validators.required]
        })
    }

    ngOnInit() {

    }

    Obtain(){
        this.UN = localStorage.un;
        if (this.formMobel.get('phone').value == ''){
          alert('手机号不能为空');
          return false;
        }else {
            this.CountDown()
            this.http.get(sessionStorage['http'] + '/action/Login/PCForgot?un='+this.UN+'&tel='+this.formMobel.get('phone').value).subscribe( response => {
                this.Verification = response;
                this.phoneState = JSON.parse(response['_body']);
                if (this.phoneState == '账号或手机错误'){
                    alert('手机号错误')
                }
          } )
        }

    }

    Savemodify(){
        if (JSON.parse(JSON.parse(this.Verification['_body']))['obj'] == this.formMobel.get('verification').value){
            this.router.navigate(['/admin/user/preservation'])
        }else {
            alert('验证码错误，请重新获取');
            this.show = false;
        }
    }

    CountDown(){
        if (this.time == 0){
            this.time = 60;
            this.ObtainInformation = '获取验证码';
            return;
        }else {
            this.time--;
            this.ObtainInformation = '验证码已发送';
        }
        setTimeout(() => {
          this.CountDown();
        },1000)
    }

}
