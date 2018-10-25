import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-returnview',
  templateUrl: './returnview.component.html',
  styleUrls: ['./returnview.component.scss']
})
export class ReturnviewComponent implements OnInit {
  id;
  model: Array<any> = [];
  KDName = '顺丰速运';//快递公司
  KDID = '';//快递单号
  constructor(public http: HttpClient,
              private info: ActivatedRoute,
              public router: Router
              ) {
    this.id = info.snapshot.params['id'];
    if(!(this.id > 0)) {
      router.navigate(['/admin/order/return']);
    }

    http.get(sessionStorage['http']+'/action/OrdersReturns/GetPCReturnView/'+this.id, {responseType: 'text'}).subscribe(data => {
      this.model = JSON.parse(data);
    });
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

  // 提交快递
  onSend(e) {
    if(this.KDID == '' || this.KDID == null)
    {
      document.getElementById('KDID').focus();
      alert('请填写物流单号');
      return false;
    }

    e.target.disabled = true;
    let params = {
      id: this.id,
      KDName: this.KDName,
      KDID: this.KDID
    };
    this.http.put(sessionStorage['http']+'/action/OrdersReturns/KuaiDi', params).subscribe(data => {
      this.model['State'] = 3;
      this.model['KDTimes'] = new Date().toLocaleDateString().replace(/\//g,"-") + ' ' + new Date().toTimeString().split(' ')[0];
      e.target.disabled = false;
    });
  }

  //取消申请
  Withdraw() {
    this.http.get(sessionStorage['http']+'/action/OrdersReturns/Cancel/'+this.id).subscribe(data => {
      this.router.navigate(['/admin/order/return']);
    });
  }
}
