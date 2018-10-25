import { Component, OnInit, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Pagination} from "../../widgets/pagination/pageconfig";
@Component({
  selector: 'app-ann',
  templateUrl: './ann.component.html',
  styleUrls: ['./ann.component.scss']
})
export class AnnComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;

  constructor(public http: HttpClient) {
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
    let url = sessionStorage['http'] + '/action/news/Getannlist?num=' + page;

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['total'];
      });
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  GetDay(time) {
    return time.split('T')[0].split('-')[2];
  }

}
