import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Pagination} from "../../../widgets/pagination/pageconfig";
import { FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  form: FormGroup;
  yue;
  constructor(public http: HttpClient, public fb: FormBuilder) {
    var daili = '';
    if(localStorage['IsBaoDan'] == '1' || localStorage['BanDanCenter'] == '0000')
    {
      daili = '3333';
    }else {
      daili = localStorage['BanDanCenter'];
    }
    this.form = fb.group({
      UserID: [localStorage['un']],
      AcceptID: [{value: daili, disabled:true}],
      MoneySum:['', Validators.required]
    });
    this.http.get(sessionStorage['http']+'/action/guquan/GetGQjifen?id='+localStorage['un']+'&md5='+Md5.hashStr(localStorage['un']+'mEnglong0526')).subscribe(data => {
      this.yue = data;
      this.form.get('MoneySum').setValidators([Validators.required, Validators.min(1), Validators.max(this.yue)]);
    });
  }

  onsubmit(e) {
    e.target.disabled = true;
    this.http.post(sessionStorage['http']+'/action/guquan/PostBuy',this.form.value).subscribe(data => {
      location.href = location.href;
    }, error2 => {
      alert(error2.error.Message);
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
    let url = sessionStorage['http'] + '/action/guquan/GetBuyList?id='+ localStorage['un'] +'&num=' + page;

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
