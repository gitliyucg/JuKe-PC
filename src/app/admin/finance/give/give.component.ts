import { Component, OnInit, Output} from '@angular/core';
import {Pagination} from "../../../widgets/pagination/pageconfig";
import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.scss']
})
export class GiveComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  money;
  uname: string = '';
  AcceptUserId = new FormControl();
  fangan1 = '天天奖励';//交易类型的双向数据绑定变量
  qianbao;//钱包
  yue;//余额
  F5: boolean = false;//防止多次点击
  last; //防止input多次请求
  constructor(public http: HttpClient, public router: Router) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }
    this.http.get(sessionStorage['http']+'/action/users/getyue?uid='+localStorage['un']).subscribe(data => {
      this.qianbao = data;
      this.yue = this.qianbao.tiantian;
    });

    // 自动获取用户名
    this.AcceptUserId.valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(sessionStorage['http']+'/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        this.uname=res.replace(/\"/g,'');
      }, error => {
        this.uname = '';
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
    let url = sessionStorage['http'] + '/action/MoneyTransfers/GetPCList?un='+ localStorage['un'] +'&num=' + page;

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

  //转换类型选择事件
  sel() {
    if(this.fangan1 == '报单金额') {
      this.yue = this.qianbao.RegBalance;
    }else if(this.fangan1 == '天天奖励') {
      this.yue = this.qianbao.tiantian;
    }else if(this.fangan1 == '动态奖励') {
      this.yue = this.qianbao.dongtai;
    }
  }

  onsubmit(e) {
    //e.target.disabled = true;
    if(this.uname === '')
    {
      alert('请输入接收会员ID');
      e.target.disabled = false;
      return false;
    }
    if(this.money > 0 && this.money <= this.yue) {
      let params = {
        uid: localStorage['un'],
        oid: this.AcceptUserId.value,
        on: this.uname,
        mt: this.fangan1,
        money: this.money,
      }
      this.http.post(sessionStorage['http']+'/action/JiFenHZ/ZhuanZeng',params).subscribe(data => {
        location.href = location.href;
      }, error => {
        alert(error.error.Message);
        e.target.disabled = false;
      });
    }else {
      alert('转换数额错误');
      e.target.disabled = false;
      return false;
    }
  }

}

