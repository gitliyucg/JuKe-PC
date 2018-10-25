import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Pagination} from "../../../widgets/pagination/pageconfig";
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-duihuan',
  templateUrl: './duihuan.component.html',
  styleUrls: ['./duihuan.component.scss']
})
export class DuihuanComponent implements OnInit {
  wallet;
  form: FormGroup;
  yue;
  jifen;
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  constructor(public http: HttpClient, public fb: FormBuilder) {
    this.form = fb.group({
      UserID: [localStorage['un']],
      Type: ['股权收益'],
      MoneySum: ['',Validators.required]
    });
    this.http.get(sessionStorage['http']+'/action/users/getyue?uid='+localStorage['un']).subscribe(data => {
      this.wallet = data;
      this.yue = this.wallet['GuQuan'];
      this.jifen = this.wallet['GuQuanFund'];
      this.form.get('MoneySum').setValidators([Validators.required, Validators.min(1), Validators.max(this.yue)]);
    });
  }

  sel(e) {
    var val = e.target.value;
    if(val == '股权收益') {
      this.yue = this.wallet['GuQuan'];
      this.form.get('Type').setValue('股权收益');
    }
    else if(val == '报单金额') {
      this.yue = this.wallet['RegBalance'];
      this.form.get('Type').setValue('报单金额');
    }
    else if(val == '天天奖励') {
      this.yue = this.wallet['tiantian'];
      this.form.get('Type').setValue('天天奖励');
    }
    else if(val == '动态奖励') {
      this.yue = this.wallet['dongtai'];
      this.form.get('Type').setValue('动态奖励');
    }
    this.form.get('MoneySum').setValidators([Validators.required, Validators.min(1), Validators.max(this.yue)]);
    this.form.get('MoneySum').setValue(this.form.get('MoneySum').value);
  }

  onsubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http']+'/action/guquan/PostDuiHuan',this.form.value).subscribe(data => {
      location.href = location.href;
    }, error2 => {
      alert(error2.error.Message);
      location.href = location.href;
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
    let url = sessionStorage['http'] + '/action/guquan/GetDuihuanList?id='+ localStorage['un'] +'&num=' + page;

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

}
