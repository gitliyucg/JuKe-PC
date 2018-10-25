import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  public ID: number;//父组件穿过来的ID
  public orderInFo = [];
  public Name;
  public Phone;
  public Address;
  public Times;
  public State = '';
  public List = [];
  public tubiao: boolean = true;

  constructor(
      public routerInFo: ActivatedRoute,
      public http: HttpClient,
      public router: Router
  ) {
      this.ID = routerInFo.snapshot.params['id'];
  }

  ngOnInit() {
      this.http.get(sessionStorage['http'] + '/action/pcmall/GetOrderView/' + this.ID).subscribe( response => {
          this.orderInFo = JSON.parse(response['data'])[0];
          this.Name = this.orderInFo['Address'].split(',')[0];
          this.Phone = this.orderInFo['Address'].split(',')[1];
          this.Address = this.orderInFo['Address'].split(',')[2];
          this.State = ['未付款','交易已取消','待发货','待收货','交易完成','售后处理中','售后处理中','交易关闭'][this.orderInFo['State']];

          this.List = JSON.parse(response['list']);
      } )
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

  //确认收货
  ConfirmOrder(){
      if (confirm('确认收货吗？')){
          this.orderInFo['State'] = 4;
          this.http.put(sessionStorage['http'] + '/action/Orders/PutShouHuo/' + this.ID, this.orderInFo).subscribe( response => {
              if (response == true){
                  alert('收货完成');
                  this.router.navigate(['/admin/order/whole']);
              }
          }, error => {
              alert(error);
          } )
      }
  }

  //取消订单
  cancelOrders(){
      if (confirm('确定取消订单吗？')){
          this.orderInFo['State'] = 1;
          this.http.put(sessionStorage['http'] + '/action/Orders/Cancel/' + this.ID, this.orderInFo).subscribe( response => {
              if (response == true){
                  this.router.navigate(['/admin/order/whole/allorders']);
              }else {
                  alert('取消订单失败，请稍后重试');
              }
          } )
      }
  }

  TuBiao(){
      this.tubiao = !this.tubiao
  }

  GetState(s) {
    let str = '';
    switch (s){
      case 0:
        str = '等待审核';
        break;
      case 1:
        str = '交易已取消';
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
