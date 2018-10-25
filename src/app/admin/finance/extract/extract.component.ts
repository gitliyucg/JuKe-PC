import { Component, OnInit, Output} from '@angular/core';
import {Pagination} from "../../../widgets/pagination/pageconfig";
import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {
  model;
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;

  Amount;
  usermodel: Object = [];
  shouxufei;
  F5: boolean = true;
  constructor(public http: HttpClient, public router: Router) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }

    http.get(sessionStorage['http']+'/action/Users/BankInfo?uid='+localStorage['un']).subscribe(data => {
      this.usermodel = data;
    });
    http.get(sessionStorage['http']+'/action/Withdrawals/GetFee/'+localStorage['CID']).subscribe(data => {
      this.shouxufei = data == null ? 0 : parseInt(data.toString()) / 100;
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
    let url = sessionStorage['http'] + '/action/Withdrawals/GetList?uid='+localStorage['un']+'&num=' + page;

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

  onSubmit() {
    if(this.Amount > 0) {
      if(this.Amount > this.usermodel['Balance']) {
        alert('余额不足');
        return false;
      }
    }
    this.F5 = true;
    let params = {
      WithdrawalDate: new Date(),
      ProcessState: '正在处理中',
      WithdrawalAmount: this.Amount,
      FactReceive: this.Amount - this.Amount * this.shouxufei,//实发
      UserID: localStorage['un'],
      ServiceCharge: this.Amount * this.shouxufei,//手续费
      Name: localStorage['Name'],
      Bank: this.usermodel['Bank'],
      BankNo: this.usermodel['BankAccount'],
      BankZhiHang: this.usermodel['BankZhihang'],
    }
    this.http.post(sessionStorage['http'] + '/action/Withdrawals/PostWithdrawal', params,{responseType:'text'}).subscribe(data => {
      location.href = location.href;
    },error => {
      alert(JSON.parse(error.error).Message);
    });
  }

  onCancel(id, i) {
    this.http.delete(sessionStorage['http']+'/action/Tixian/pcquxiao/'+id).subscribe(data => {
      location.href = location.href;
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

  GetTimes2(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  Amounts(s) {
    if(s%100 == 0) {
      this.Amount = s;
      this.F5 = false;
    }else {
      this.F5 = true;
    }
  }
}

