import {Component, OnInit, Output} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Pagination } from "../../../widgets/pagination/pageconfig";

@Component({
    selector: 'app-allorders',
    templateUrl: './allorders.component.html',
    styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

    public OrderList = [];//存储订单数据的列表
    @Output()
    public pagination: Pagination = Pagination.defaultPagination;
    public state: number;//订单状态
    public uid: number;
    public Total: number;
    public States: string = '';
    public Length: number;

    constructor(
        public http: HttpClient,
    ) { }

    //获取全部订单的信息
    public GetWhole(state): void{
        let page = this.pagination.currentPage;//定义页码
        this.uid = localStorage.uid;
        this.http.get(sessionStorage['http'] + '/action/Orders/GetList?uid='+this.uid+'&state='+state+'&num='+page).subscribe( response => {
            this.pagination.totalItems = response['total'];
            this.Total = response['total'];
            let information = JSON.parse(response['data']);
            let commodity = JSON.parse(response['product']);
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
                this.Length = this.OrderList.length;
            }
        } )
    }

    public ngOnInit(): void {
        this.GetWhole('');
        this.pagination.currentPage = 1;
        this.pagination.changePage = ( () => {
            this.GetWhole('')
        } )
        // this.GetWhole(4)
        // this.getOrderNum();
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

    //确认收货
    ConfirmOrder(ID){
    }

    //订单数量总计
    getOrderNum(){
        this.uid = localStorage.uid
        this.http.get(sessionStorage['http'] + '/action/Orders/GetOrderSize/' + this.uid).subscribe( response => {
        } )
    }

    getState(s) {
      var run = '';
      switch (s)
      {
        case 0:
          run = '待付款';
          break;
        case 1:
          run = '交易已取消';
          break;
        case 2:
          run = '待发货';
          break;
        case 3:
          run = '待收货';
          break;
        case 4:
          run = '交易完成';
          break;
        case 5:
          run = '售后处理中';
          break;
        case 6:
          run = '售后处理中';
          break;
        case 7:
          run = '交易关闭';
          break;
      }
      return run;
    }

}
