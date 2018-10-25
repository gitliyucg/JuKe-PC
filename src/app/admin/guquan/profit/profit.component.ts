import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Md5} from "ts-md5/dist/md5";
import { Router} from "@angular/router";
@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {
  yue: number = 0;
  constructor(public http: HttpClient,public router: Router) {
    http.get(sessionStorage['http']+'/action/users/getyue?uid='+localStorage['un']).subscribe(data => {
      this.yue = data['GuQuan'];
    });
  }

  ngOnInit() {
  }

  //转天天奖励
  onDay()
  {
    if(this.yue >0)
    {
      let params = Md5.hashStr(localStorage['un']+'mEnglong0526');
      this.http.post(sessionStorage['http']+'/action/guquan/PostTransfDay/'+parseInt(localStorage['un'])+'?md5='+params,{}).subscribe(data => {
        location.href = location.href;
      }, error2 => {
        alert(error2.error.Message);
      });
    }else {
      alert('余额不足');
    }
  }

  //转报单金额
  onReg()
  {

  }

  //转股权积分
  onguquan()
  {

  }

}
