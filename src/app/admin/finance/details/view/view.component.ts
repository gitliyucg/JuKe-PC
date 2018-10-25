import { Component, OnInit, Output } from '@angular/core';
import { Pagination} from "../../../../widgets/pagination/pageconfig";
import { HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  u;
  t;

  constructor(public http: HttpClient, private routerInfo: ActivatedRoute) {
    this.u = routerInfo.snapshot.params['u'];
    this.t = routerInfo.snapshot.params['t'];
  }

  public ngOnInit(): void {
    this.initList();
    this.pagination.currentPage = 1;
    this.pagination.changePage = (() => {
      this.initList();
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

  private initList(): void {
    const page = this.pagination.currentPage;
    const url = sessionStorage['http'] + '/action/mondydetails/Getview?u=' + this.u + '&t=' + this.t + '&num=' + page;

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

}
