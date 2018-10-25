import { Component, OnInit,Input } from '@angular/core';
import { HttpClient} from '@angular/common/http';
declare var jQuery: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  banner: object = [];
  newsPin: Array<any> = [];
  model: Array<any> = [];
  h: number = 0;
  constructor(public http: HttpClient) {
    this.http.get(sessionStorage['http']+'/action/products/getpcnew').subscribe(data => {
      this.newsPin = JSON.parse(data['new']);
      this.model = JSON.parse(data['data']);
    });
  }

  ngOnInit() {
    //Banner
    this.http.get(sessionStorage['http']+'/action/banners/getlist').subscribe(data => {
      this.banner = data;

      var bannerHtml = '';
      var vw = document.body.clientWidth;
      var pagin = 0;
      for(var i in this.banner)
      {
        bannerHtml += '<img src='+this.banner[i].Images+' height='+(vw/16*6)+' border="0" data-href="'+this.banner[i].URL+'" />';
        pagin ++;
      }
      //document.getElementById('index1img').innerHTML = bannerHtml;
      jQuery('.index-pagination').children('li:lt('+pagin+')').css('display','block');
      //jQuery.IndexLoad();
    });
    //下来刷新
    const that = this;
    let num = 1;
    let numcurrent;
    jQuery(window).scroll(function() {
      let winheight = jQuery(document).scrollTop();
      let current = jQuery(document).height();
      if((current - winheight + 350) <= 1300)
      {
        if(numcurrent != num)
        {
          numcurrent = num;
            that.http.get(sessionStorage['http']+'/action/products/GetPCList?num='+num).subscribe(data => {
              let soure = JSON.parse(data['data']);
              for (let item of soure){
                that.model.push(item)
              }
              let pagecount = data['total'] / 16 + 1;
              if(num < pagecount) {
                num++;
              }
            });
        }
      }
    });
  }

  GetTitle(str) {
    if(str.length >16)
    {
      return str.substring(0,16) + '...';
    }else {
      return str;
    }
  }

  haha(s) {
    this.h++;
    if(this.h == 1)
    {
      jQuery.IndexLoad();
    }
  }
}
