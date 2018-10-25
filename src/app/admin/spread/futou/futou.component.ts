import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
@Component({
  selector: 'app-futou',
  templateUrl: './futou.component.html',
  styleUrls: ['./futou.component.scss']
})
export class FutouComponent implements OnInit {
  formModel: FormGroup;
  wallet: object = [];
  baodan; // 每单金额
  zonge: number = 0;// 报单总额
  chae: number = 0;// 差额
  chaeOn: boolean = true; // 差额风险提醒开关
  shangxian; // 报单上限
  baodanshu: number = 0; // 当前会员已报单数
  model;
  futouMax;
  constructor(public http: HttpClient, public fb: FormBuilder, public router: Router) {
    if(sessionStorage['pass2'] == null || sessionStorage['pass2'] == undefined || sessionStorage['pass2'] == '')
    {
      router.navigate(['/admin/login2']);
    }
    this.formModel = fb.group({
      un: [localStorage['un']],
      num: [1],
      money: [''],
      tian: [''],
      dong: [''],
    });
    // 获取设置参数
    http.get(sessionStorage['http']+'/action/TuiGuang/GetConf/'+localStorage['CID']).subscribe(data => {
      this.baodan = data[0].BaoDan;
      this.shangxian = data[0].FuTouDan;
      this.chae = this.baodan;
      this.zonge = this.baodan;
    });

    http.get(sessionStorage['http']+'/action/Users/GetYue?uid='+localStorage['un']).subscribe(data => {
      this.wallet = data;
      this.formModel.get('money').setValidators(Validators.max(this.wallet['RegBalance']));
      this.formModel.get('tian').setValidators(Validators.max(this.wallet['tiantian']));
      this.formModel.get('dong').setValidators(Validators.max(this.wallet['dongtai']));
    });

    http.get(sessionStorage['http'] + '/action/TuiGuang/GetFutou?un='+localStorage['un']).subscribe(data => {
      this.model = data;
      for(let i=0;i< this.model.length;i++) {
        if(this.model[i].State == 0) {
          this.baodanshu += this.model[i].BaoDanNum;
        }
      }
      this.futouMax = this.shangxian - this.baodanshu;
      this.formModel.get('num').setValidators([Validators.required, Validators.min(1), Validators.max(this.futouMax)]);
    });
  }

  ngOnInit() {
  }

  // 改变报单数，得出报单总额
  change(v) {
    this.chae = this.zonge = this.baodan * v;
    let money = Number(this.formModel.value.money);
    let tian = Number(this.formModel.value.tian);
    let dong = Number(this.formModel.value.dong);
    this.chae = this.zonge - money - tian - dong;
    if(this.chae == 0) {
      this.chaeOn = false;
    }else {
      this.chaeOn = true;
    }
  }

  // 计算差额
  oncha(v) {
    let money = Number(this.formModel.value.money);
    let tian = Number(this.formModel.value.tian);
    let dong = Number(this.formModel.value.dong);
    this.chae = this.zonge - money - tian - dong;
    if(this.chae == 0) {
      this.chaeOn = false;
    }else {
      this.chaeOn = true;
    }
  }

  onSubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http']+'/action/TuiGuang/FuTou',this.formModel.value, {responseType: 'text'}).subscribe(data => {
      location.href = location.href;
    }, error => {
      alert(JSON.parse(error.error).Message);
      e.target.disabled = false;
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
}

