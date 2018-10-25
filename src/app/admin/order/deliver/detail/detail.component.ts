import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public ID: number;//父组件穿过来的ID
  public orderList = [];
  public List: Array<any> = [];
  public Name;
  public Phone;
  public Address;
  public Times;
  public State: string;
  public tubiao: boolean = true;

  constructor(
      public routerInFo: ActivatedRoute,
      public http: HttpClient,
      public router: Router
  ) {
      this.ID = routerInFo.snapshot.params['id']
  }

  ngOnInit() {
      this.http.get(sessionStorage['http'] + '/action/pcmall/GetOrderView/' + this.ID).subscribe( response => {
          this.orderList = JSON.parse(response['data'])[0];
          this.Name = this.orderList['Address'].split(',')[0];
          this.Phone = this.orderList['Address'].split(',')[1];
          this.Address = this.orderList['Address'].split(',')[2];
          this.Times = this.GetTimes(this.orderList['Times']);
          if (this.orderList['State'] == 0){
              this.State = '未付款'
          }else if (this.orderList['State'] == 1){
              this.State = '未付款'
          }else if (this.orderList['State'] == 2){
              this.State = '待发货'
          }else if (this.orderList['State'] == 3){
              this.State = '确认收货'
          }else if (this.orderList['State'] == 4){
              this.State = '完成交易'
          }
          this.List = JSON.parse(response['list']);
      } )
  }

  //取消订单
  cancelOrders(){
      if (confirm('确定取消订单吗？')){
          this.ID = this.routerInFo.snapshot.params['id'];
          this.orderList['State'] = 1;
          this.http.put(sessionStorage['http'] + '/action/Orders/Cancel/' + this.ID, this.orderList).subscribe( response => {
              if (response == true){
                  this.router.navigate(['/admin/order/whole/allorders']);
              }else {
                  alert('取消订单失败，请稍后重试');
              }
          } )
      }
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

  GetState(s) {
    let str = '';
    switch (s){
      case 0:
        str = '等待审核';
        break;
      case 1:
        str = '未通过审核';
        break;
      case 2:
        str = '待发货';
        break;
      case 3:
        str = '已经发货';
        break;
      case 4:
        str = '已完成';
        break;
      case 5:
        str = '已完成';
        break;
      case 6:
        str = '已完成';
        break;
      case 7:
        str = '已完成';
        break;
    }
    return str;
  }

}
