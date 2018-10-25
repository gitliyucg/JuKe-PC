///<reference path="../../../node_modules/@angular/http/src/static_response.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    public news: any = [];
    public items: any;
    public pages: number = 1;
    public total: number;//显示新闻的总数量

    constructor(
        public http: HttpClient
    ) {
    }

    ngOnInit() {
        this.http.get(sessionStorage['http'] + '/action/News/GetList?num=' + this.pages).subscribe(response => {
            this.news = JSON.parse(response['data']);
            this.total = response['total'];
        });
    }

    loadMore(){
        this.pages++
        this.http.get(sessionStorage['http'] + '/action/News/GetList?num=' + this.pages).subscribe(response => {
            let data = JSON.parse(response['data'])
            for (let item of data){
                this.news.push(item)
            }
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
