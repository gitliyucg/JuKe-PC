import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Pagination} from "../../../widgets/pagination/pageconfig";
import { Router} from '@angular/router';
@Component({
  selector: 'app-trans',
  templateUrl: './trans.component.html',
  styleUrls: ['./trans.component.scss']
})
export class TransComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  fanganA;
  fanganB;
  zhuanxiang = '';
  money;
  fanganC;//第二方案总数据存储器
  fangan1;//交易类型的双向数据绑定变量
  qianbao;//钱包
  yue;//余额
  F5: boolean = false;//防止多次点击
  constructor(public http: HttpClient, public router: Router) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }

    http.get(sessionStorage['http']+'/action/DuiHuan/GetZhuanHuan').subscribe(data => {
      this.fanganA = JSON.parse(data['S']);
      this.fangan1 = this.fanganA[0].id;//交易类型初始化
      this.fanganC = JSON.parse(data['A']);
      this.fanganB = this.fanganC[this.fanganA[0].id];
      this.zhuanxiang = this.fanganB[0].name;//转向默认值初始化
    });

    this.http.get(sessionStorage['http']+'/action/users/getyue?uid='+localStorage['un']).subscribe(data => {
      this.qianbao = data;
      this.sel();
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
    let url = sessionStorage['http'] + '/action/DuiHuan/GetList?un='+ localStorage['un'] +'&num=' + page;

    this.http.get(url)
      .subscribe(v => {
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
    this.fanganB = this.fanganC[this.fangan1];
    this.zhuanxiang = this.fanganB[0].name;//转向默认值初始化
    //变化余额情况
    if(this.fangan1 == 1) {
      this.yue = this.qianbao.RegBalance;
    }else if(this.fangan1 == 2) {
      this.yue = this.qianbao.tiantian;
    }else if(this.fangan1 == 3) {
      this.yue = this.qianbao.dongtai;
    }
  }

  onsubmit() {
    this.F5 = true;
    if(this.money > 0 && this.money <= this.yue) {
      let types = 0;
      if(this.fangan1 == 1 && this.zhuanxiang === '天天奖励') {
        types = 1;
      }else if(this.fangan1 == 1 && this.zhuanxiang === '动态奖励') {
        types = 2;
      }else if(this.fangan1 == 2 && this.zhuanxiang === '报单金额') {
        types = 3;
      }else if(this.fangan1 == 2 && this.zhuanxiang === '动态奖励') {
        types = 4;
      }else if(this.fangan1 == 3 && this.zhuanxiang === '报单金额') {
        types = 5;
      }else if(this.fangan1 == 3 && this.zhuanxiang === '天天奖励') {
        types = 6;
      }
      let params = {
        un: localStorage['un'],
        cid: localStorage['cid'],
        type: types,
        Amount: this.money
      }
      this.http.post(sessionStorage['http']+'/action/duihuan/ZhuanHuobi',params).subscribe(data => {
        location.href = location.href;
      });
    }else {
      alert('转换数额错误');
      this.F5 = false;
    }
  }

}
