import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-newslist',
  templateUrl: "./newslist.component.html",
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit {
    listID;
    listTxt: object = [];
    content;
    prev: object = [];
    next: object = [];

    constructor(
        public http: HttpClient,
        public routerInFo: ActivatedRoute,

    ) {
        this.listID = routerInFo.snapshot.params['id'];
        this.http.get(sessionStorage['http'] + '/action/News/GetView/' + this.listID).subscribe(data => {
            this.listTxt = data;
            document.getElementById('News-view-cont').innerHTML = data['Contents'];
        })
        this.http.get(sessionStorage['http'] + '/action/news/GetUDNews?id=' + this.listID).subscribe(response => {
            if(response['prev'] === null)
            {
                this.prev = {
                    ID:0,
                    Title:'没有了'
                }
            }else {
                this.prev = JSON.parse(response['prev']);
            }

            if(response['next'] === null)
            {
                this.next = {
                    ID: 0,
                    Title: '没有了'
                }
            }else {
                this.next = JSON.parse(response['next']);
            }
        })
    }

    ngOnInit() {

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
