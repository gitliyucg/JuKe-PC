import { Component, OnInit, Output } from '@angular/core';
import { Pagination} from "../../../widgets/pagination/pageconfig";
import { HttpClient} from "@angular/common/http";
import { Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Md5} from "ts-md5/dist/md5";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-fenpei',
  templateUrl: './fenpei.component.html',
  styleUrls: ['./fenpei.component.scss']
})
export class FenpeiComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  yue;//余额
  myForm: FormGroup;
  constructor(public http: HttpClient, public router: Router,public fb: FormBuilder) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }
    this.myForm = fb.group({
      UID: [localStorage['uid']],
      UserID: [localStorage['un']],
      AcceptUserID: ['', Validators.required],
      AcceptUserName: [{value:'', disabled:true}, Validators.required],
      MoneySum: ['', Validators.required],
    });

    this.http.get(sessionStorage['http']+'/action/GuQuan/GetGuQuan?id='+localStorage['un']+'&md5='+Md5.hashStr(localStorage['un']+'mEnglong0526')).subscribe(data => {
      this.yue = data;
      this.myForm.get('MoneySum').setValidators([Validators.required,Validators.min(1), Validators.max(this.yue)]);
    });

    // 自动获取用户名
    this.myForm.get('AcceptUserID').valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(sessionStorage['http']+'/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        this.myForm.get('AcceptUserName').setValue(res.replace(/\"/g,''));
      }, error => {
        this.myForm.get('AcceptUserName').setValue('');
      })
    });

  }

  public ngOnInit(): void {
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    let page = this.pagination.currentPage;
    let url = sessionStorage['http'] + '/action/guquan/GetGuQuanList?id='+ localStorage['un'] +'&num=' + page;

    this.http.get(url).subscribe(v => {
      this.model = JSON.parse(v['data']);
      this.pagination.totalItems = v['total'];
    });
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0];
      }
    } catch (e) {
      return time;
    }
  }

  onsubmit(e) {
    e.target.disabled = true;
    this.myForm.value.AcceptUserName = this.myForm.get('AcceptUserName').value;
    this.http.post(sessionStorage['http']+'/action/GuQuan/PostFenpei',this.myForm.value).subscribe(data => {
      location.href = location.href
    }, error2 => {
      alert(error2.error.Message);
      e.target.disabled = false;
    });
  }

}

