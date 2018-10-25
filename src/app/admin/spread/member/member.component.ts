import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import "ztree";
declare var $: any;
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  // 搜索
  setting = {
    data: {
      simpleData: {
        enable: true,
        idKey: 'id',
        pIdKey: 'pId',
        rootpId: ''
      }
    },
    async: {
      enable: true,
      type: 'get',
      dataType: 'text',
      // contentType: 'application/json',
      url: sessionStorage['http'] + '/action/tuiguang/getmember',
      autoParam: ['id'],
    },
    view: {
      showIcon: false,
    }
  };
  zNodes;
  id: String = localStorage['un'];

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.databind();
  }

  databind() {
    let params: String = 'null';
    if (this.id !== '') {
      params = this.id;
    }
    this.http.get(sessionStorage['http'] + '/action/tuiguang/getmember?id=' + params).subscribe(data => {
      this.zNodes = data;
      $.fn.zTree.init($('#treeid'), this.setting, this.zNodes);
    });
  }

  serach() {
    if (this.id !== '') {
      this.databind();
    }
  }
}
