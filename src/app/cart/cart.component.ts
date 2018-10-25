import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { Md5} from "ts-md5/dist/md5";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  model: Array<any> = [];
  menuArr: Array<any> = [];
  zongjia: number = 0;
  constructor(public http: HttpClient,public router: Router) {
    if (localStorage['uid'] == null && localStorage['uid'] == undefined) {
      this.router.navigate(['/login/'+Md5.hashStr('cart')]);
    }
  }

  ngOnInit() {
    this.http.get(sessionStorage['http']+'/action/ShopCars/GetList?uid='+localStorage['uid'],{responseType: 'text'}).subscribe(data => {
      this.model = JSON.parse(data);
    });
  }

  jian(i) {
    this.model[i].Num--;
    this.http.put(sessionStorage['http']+'/action/ShopCars/PutShopCar/'+this.model[i].ID,this.model[i]).subscribe(data => {

    });
    for(var j = 0;j< this.menuArr.length;j++)
    {
      if(this.menuArr[j] == i)
      {
        this.zongjia -= this.model[i].Price;
      }
    }
  }

  // 加号
  jia(i) {
    if(this.model[i].Num < this.model[i].Size)
    {
      this.model[i].Num++;
      this.http.put(sessionStorage['http']+'/action/ShopCars/PutShopCar/'+this.model[i].ID,this.model[i]).subscribe(data => {

      });
      for(var j = 0;j< this.menuArr.length;j++)
      {
        if(this.menuArr[j] == i)
        {
          this.zongjia += this.model[i].Price;
        }
      }
    }
  }

  // 全选
  cheall(e) {
    // 清空数组
    this.menuArr = [];
    this.zongjia = 0;
    if (e) {
      for (let i = 0; i < this.model.length; i++) {
        this.menuArr.push(i);
        this.model[i].chestate = true;
        this.zongjiaAdd(i);
      }
    } else {
      for (let i = 0; i < this.model.length; i++) {
        this.model[i].chestate = false;
      }
    }
  }

  // 单选
  checlick(e, i) {
    if (e.target.checked) {
      this.menuArr.push(parseInt(e.target.value));
      this.model[i].chestate = true;
      this.zongjiaAdd(i);
    } else {
      // 移除
      this.menuArr.splice(this.menuArr.indexOf(e.target.value), 1);
      this.model[i].chestate = false;
      this.zongjiaDel(i);
    }
    var che = (<HTMLInputElement>document.getElementById('checks'));
    if(this.menuArr.length < this.model.length)
    {
      che.checked = false;
    }else {
      che.checked = true;
    }
  }

  // 单删
  delete(id, i) {
    if (confirm('确认删除？')) {
      this.http.delete(sessionStorage['http'] + '/action/ShopCars/DeleteShopCar/'+id).subscribe(data => {
        if(this.menuArr.indexOf(i) >= 0 ) {
          // 被勾选：删除数组，删除总价
          this.menuArr.splice(this.menuArr.indexOf(i), 1);
          this.zongjia -= this.model[i].Price * this.model[i].Num;
          if(this.zongjia == 0)
          {
            (<HTMLInputElement>document.getElementById('checks')).checked = false;
          }
        }
        this.model.splice(i, 1);
      });
    }
  }

  // 批量删除
  DelAll() {
    if (confirm('这个删除前真得仔细确认！')) {
      let quanxian = '';
      for(var i=0;i<this.menuArr.length;i++)
      {
        if(quanxian == '')
        {
          quanxian = this.model[this.menuArr[i]].ID;
        }else {
          quanxian += ','+this.model[this.menuArr[i]].ID;
        }
      }
      this.http.delete(sessionStorage['http'] + '/action/ShopCars/DList?ids=' + quanxian).subscribe(data => {
        if(this.menuArr.length == this.model.length) {
          //全部删除
          this.router.navigate(['/index']);
        }else {
          //部分被勾选
            for(var j =0;j<this.menuArr.length;j++)
            {
              let i = this.menuArr[j];
                this.zongjia -= this.model[i].Price * this.model[i].Num;
                this.model.splice(i,1);
                this.menuArr.splice(j,1);
            }
        }
      });
    }
  }

  zongjiaAdd(i) {
    this.zongjia += this.model[i].Price * this.model[i].Num;
  }

  zongjiaDel(i) {
    this.zongjia -= this.model[i].Price * this.model[i].Num;
  }

  buy() {
    if(this.menuArr.length <=0)
    {
      alert('请选择想要购买的商品');
      return false;
    }
    let ids = '';
    for(var i=0;i<this.menuArr.length;i++)
    {
      if(ids == '') {
        ids = this.model[this.menuArr[i]].ID;
      }else {
        ids += ','+this.model[this.menuArr[i]].ID;
      }
    }
    this.router.navigate(['/order/confirm/'+encodeURIComponent(ids)]);
  }

}
