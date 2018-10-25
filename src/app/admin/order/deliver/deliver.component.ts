import {Component, OnInit, Output} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Pagination } from "../../../widgets/pagination/pageconfig";

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.scss']
})
export class DeliverComponent implements OnInit {

  public OrderList = [];
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  public UID: number;
  public Total: number;//判断该用户有没有相关订单
  public States: string;
  public ID: number;

  constructor(
      public http: HttpClient,
      public router: Router,
      public routerInFo: ActivatedRoute
  ) { }

  public ngOnInit(): void {
      this.GetOrderList(2);
      // this.GetOrderList(1);
      this.pagination.currentPage = 1;
      this.pagination.changePage = ( () => {
          this.GetOrderList(2);
          // this.GetOrderList(1);
      } )
  }

  public GetOrderList(state): void{
      let page = this.pagination.currentPage;//定义页码
      this.UID = localStorage.uid
      this.http.get(sessionStorage['http'] + '/action/Orders/GetList?uid='+this.UID+'&state='+state+'&num=' + page).subscribe( response => {
          this.pagination.totalItems = response['total'];
          this.Total = response['total'];
          let information = JSON.parse(response['data']);
          let commodity = JSON.parse(response['product']);
          let arr = [];
          if(response['total'] > 0){
              for (let i = 0; i < information.length; i++){
                  let obj = {
                      order: information[i],
                      product: [],
                      orderProduct: 0,//单个订单的总产品量
                      orderIntegral: 0,//单个订单的总积分
                  }
                  for (let j = 0; j < commodity.length; j++){
                      if (commodity[j].OID == information[i].ID){
                          obj.product.push(commodity[j]);
                          obj.orderProduct += commodity[j].Num;
                          obj.orderIntegral += commodity[j].Price;
                      }
                  }
                  this.OrderList.push(obj)
              }
              for (let l = 0; l < this.OrderList.length; l++){
                  if (this.OrderList[l]['order']['State'] == 2){
                      this.States = '待发货';
                  }
              }
          }
      } )
  }

  //删除订单
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

}
