import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-jihuo',
  templateUrl: './jihuo.component.html',
  styleUrls: ['./jihuo.component.scss']
})
export class JihuoComponent implements OnInit {
  ID;
  formModel: FormGroup;
  wallet: Array<any> = [];
  zonge: number = 0;// 报单总额
  chae: number = 0;// 差额
  chaeOn: boolean = true; // 差额风险提醒开关
  constructor(public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute, public fb: FormBuilder) {
    this.ID = routerinfo.snapshot.params['id'];
    this.formModel = fb.group({
      un: [localStorage['un']],
      aid: [this.ID],
      num: [0],
      money: [''],
      tian: [''],
      dong: [''],
    });

    // 激活会员的报单情况
    http.get(sessionStorage['http']+'/action/TuiGuang/GetJihuoInfo?un='+this.ID+'&bdu='+localStorage['un']).subscribe(data => {
      if(data['error'])
      {
        alert(data['error']);
        router.navigate(['/admin/spread/list']);
        return false;
      }
      this.chae = this.zonge = data['zonge'];
      this.wallet = JSON.parse(data['wallet']);
      this.formModel.get('num').setValue(data['num']);
      this.formModel.get('money').setValidators(Validators.max(this.wallet['RegBalance']));
      this.formModel.get('tian').setValidators(Validators.max(this.wallet['tiantian']));
      this.formModel.get('dong').setValidators(Validators.max(this.wallet['dongtai']));
    });
  }

  ngOnInit() {
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
    this.http.post(sessionStorage['http']+'/action/TuiGuang/Activat2', this.formModel.value,{responseType: 'text'}).subscribe(data => {
      if(data.replace(/\"/g, '') == "余额不足") {
        alert("余额不足");
        e.target.disabled = false;
      }else {
        this.router.navigate(['/admin/spread/list']);
      }
    });
  }


}
