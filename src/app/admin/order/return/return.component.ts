import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

    public UID: number;
    public Total: number = 0;//判断该用户有没有相关订单
    public OrderList: Array<any> = [];
    public States: string;

    constructor(
        public http: HttpClient
    ) { }

    ngOnInit() {
        this.GetOrderList()
    }

    GetOrderList(){
        this.UID = localStorage.uid
        this.http.get(sessionStorage['http'] + '/action/OrdersReturns/GetOrdersReturn?uid='+this.UID+'&num=' + 1).subscribe( response => {
            this.OrderList = JSON.parse(response['data']);
            this.Total = response['total']
        } )
    }

    deleteOrders(ID,i){
        if (confirm('确定要删除吗？')){
            this.http.delete(sessionStorage['http'] + '/action/Orders/DeleteOrders/'+ ID).subscribe( response =>{
                this.OrderList.splice(i,1)
            })
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
          str = '等待退货';
          break;
        case 3:
          str = '等待验货';
          break;
        case 4:
          str = '退款成功';
          break;
      }
      return str;
    }

    // 取消退款
    onReturn(i) {
      if(confirm('确认要取消退款么？'))
      {
        this.http.get(sessionStorage['http']+'/action/OrdersReturns/Cancel/'+this.OrderList[i].ID).subscribe(data => {
          this.OrderList.splice(i,1);
        });
      }
    }
}
