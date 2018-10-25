import { Component, OnInit, Output } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {Md5} from "ts-md5/dist/md5";
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id;
  model: Array<any> = [];
  proparams: Array<any> = [];
  prices;
  priceLinshi;
  size: number = 1;
  maxSize: number = 1;// 最大库存
  error: boolean = false;
  guig = 0;
  parTitle = '';

  num: number = 0;

  constructor(public router: Router,public rinfo: ActivatedRoute,public http: HttpClient) {
    this.id = rinfo.snapshot.params['id'];
    if(this.id > 0) {
      this.http.get(sessionStorage['http']+'/action/products/GetPCView/'+this.id).subscribe(data => {
        if(data['data'] != undefined)
        {
          this.model = JSON.parse(data['data']);
          this.proparams = JSON.parse(data['params']);
          document.getElementById('ProCont').innerHTML = this.model['Contents'];
          var arr = [];
          for(var i=0; i< this.proparams.length; i++)
          {
            arr.push(this.proparams[i].Price)
          }
          arr = arr.sort(function (a,b) {
            return a - b;
          })
          this.priceLinshi = this.prices = arr[0] + ' - ' + arr[arr.length - 1];
        }else {
          this.router.navigate(['/index']);
        }

      });
    }else {
      this.router.navigate(['/index']);
    }
  }

  ngOnInit() {
    let jthis;
    let that = this;
    $('.guige').on('click','li',function () {
      $('.guige li').removeClass('active');
      if(jthis == this)
      {
        jthis = '';
        that.prices = that.priceLinshi;
        that.guig = 0;
        that.maxSize = 1;
        that.size = 1;
      }else {
        jthis = this;
        let i = $(this).attr('data-i');
        that.prices = parseFloat(that.proparams[i].Price);
        that.maxSize = parseInt(that.proparams[i].Num);
        that.onsize(that.size);
        that.parTitle = that.proparams[i].Title;
        $(this).addClass('active');
        that.guig = parseInt(that.proparams[i].ID);
        if(that.error)
        {
          that.error = false;
        }
      }
    })
  }

  ngAfterViewInit() {

  }

  // 减号
  jian() {
    this.size--;
  }

  // 加号
  jia() {
    if(this.size < this.maxSize)
    {
      this.size++;
    }else {
      this.onsize(this.size);
    }
  }

  onsize(e) {
    if(isNaN(e))
    {
      this.size = 1;
      $('.num').val(this.size);
    }else if(this.size < 1)
    {
      this.size = 1;
    }else if(parseInt(this.size.toString()) >= parseInt(this.maxSize.toString()))
    {
      this.size = this.maxSize;
      $('.num').val(this.maxSize);
    }
  }

  // 立即购买
  buy() {
    if(this.guig > 0)
    {
      let token = Md5.hashStr(this.guig+'|'+this.size+'|'+'menglong0526@jukePC');
      this.router.navigate(['/order/buy/'+this.guig+'/'+this.size+'/'+token]);
    }else {
      this.error = true;
    }
  }

  // 加入购物车
  cart() {
    if(this.guig > 0)
    {
      let params = {
        UID: localStorage['uid'],
        PID: this.id,
        ParamID: this.guig,
        Num: this.size,
        Times: new Date()
      }

      this.http.post(sessionStorage['http']+'/action/ShopCars/PostShopCar',params).subscribe(data => {
        this.num++;
      });
    }else {
      this.error = true;
    }
  }
}
