import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formModel: FormGroup;
  bankModel: object = [];
  selBank = '';
  tjName = new FormControl();
  uname = '';
  constructor(public http: HttpClient, public fb: FormBuilder,) {
    this.tjName.setValue(localStorage['un']);
    this.uname = localStorage['Name'];

    this.formModel = fb.group({
      Id: [0],
      UserID: ['', [Validators.required, Validators.pattern("^[A-z][0-9A-z]{3,9}$")]],
      Name: ['', Validators.required],
      BaoDanSum: ['', [Validators.required, Validators.min(1)]],
      IDNumber: ['', [Validators.required, Validators.pattern("(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}[0-9Xx]$)")]],
      Mobile: ['', [Validators.required, Validators.pattern("^1[0-9]{10}$")]],
      OpeningBank: ['', Validators.required],
      BankAccount: ['', Validators.required],
      BankZhihang: ['', Validators.required],
      Password: ['', [Validators.required, Validators.pattern("^[0-9A-z]{6,16}$")]],
      SecondaryPassword: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      RefereeMobile: [localStorage['un'], Validators.required],
      BanDanCenter: [localStorage['BanDanCenter']],
      RegistUser: [localStorage['un']],
    });
    http.get(sessionStorage['http']+'/action/Banks/GetBank').subscribe(data => {
      this.bankModel = data;
      this.selBank = this.bankModel[0].BankName;//select初始化
    });
    if(localStorage['IsBaoDan'] == '1')
    {
      this.formModel.get('BanDanCenter').setValue(localStorage['un'])
    }

    this.tjName.valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(sessionStorage['http']+'/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        this.uname=res.replace(/\"/g,'');
        this.formModel.get('RefereeMobile').setValue(this.tjName.value);
      }, error => {
        this.uname = '';
        this.formModel.get('RefereeMobile').setValue('');
      })
    });
  }

  ngOnInit() {
  }

  onSubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http']+'/action/users/Register',this.formModel.value, {responseType: 'text'}).subscribe(data => {
      alert(data.replace(/\"/g, ''));
      location.href = location.href;
    },error2 => {
      alert(JSON.parse(error2.error).Message);
      e.target.disabled = false;
    });
  }

}
