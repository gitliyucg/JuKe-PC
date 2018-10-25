import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './indexs.component.html',
  styleUrls: ['./indexs.component.scss']
})
export class IndexComponents implements OnInit {
  UserID: string;
  Name: string;
  baodan: string;
  tiantian: string;
  dongtai: string;
  zhongxin: string;
  ICE: string;
  jieyu: number = 0;
  guquan: number = 0;
  guquanfund: number = 0;

  ann;

  constructor(public http: HttpClient,) {
    this.UserID = localStorage['un'];
    this.Name = localStorage['Name'];
    this.zhongxin = localStorage['IsBaoDan'] === '1' ? '是':localStorage['BanDanCenter'];
    http.get(sessionStorage['http']+'/action/Users/Getyue?uid='+localStorage['un']).subscribe(data =>{
      this.baodan = data['RegBalance'];
      this.tiantian = data['tiantian'];
      this.dongtai = data['dongtai'];
      this.ICE = data['ICE'];
      this.jieyu = data['Oldmoney'];
      this.guquan = data['GuQuan'];
      this.guquanfund = data['GuQuanFund'];
    });

    http.get(sessionStorage['http']+'/action/News/annlist').subscribe(data =>{
      this.ann = data;
    });
  }

  ngOnInit() {
  }

  GetTimes(time) {
    if (time != null) {
      return time.split('T')[0];
    }
  }

}
