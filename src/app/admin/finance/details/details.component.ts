import { Component, OnInit, Output } from '@angular/core';
import {Pagination} from "../../../widgets/pagination/pageconfig";
import { HttpClient} from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  wheres: string = '';
  sd: string = '';
  ed: string = '';

  constructor(public http: HttpClient) {
  }

  public ngOnInit(): void {
    $(function () {
      $('.bsrp-time').datetimepicker({
        minView: 'month', // 选择日期后，不会再跳转去选择时分秒
        language: 'cn',
        format: 'yyyy-mm-dd',
        todayBtn: 1,
        autoclose: 1,
      }).on('changeDate', function (ev) {
        $(this).focus();
        $(this).blur();
      });
    });
    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    let page = this.pagination.currentPage;
    let url = sessionStorage['http'] + '/action/BonusDetails/GetPCList?un='+localStorage['un']+'&num=' + page;
    if (this.sd != '') {
      url += '&sd=' + this.sd;
    }
    if (this.ed != '') {
      url += '&ed=' + this.ed;
    }

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

  setSD(e) {
    this.sd = e;
  }

  setED(e) {
    this.ed = e;
  }

  // 搜索
  serach() {
    if (this.sd == '' && this.ed == '') {
      return;
    }
    this.pagination.currentPage = 1;
    this.initList();
  }

}
