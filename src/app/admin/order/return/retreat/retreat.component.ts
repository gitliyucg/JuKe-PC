import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router} from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-retreat',
    templateUrl: './retreat.component.html',
    styleUrls: ['./retreat.component.scss']
})
export class RetreatComponent implements OnInit {
    public formMobel: FormGroup;

    public ID: number;
    public model: Array<any> = [];

    constructor(
        public http: HttpClient,
        public routerInFo: ActivatedRoute,
        public fb: FormBuilder,
        public router: Router
    ) {
        this.formMobel = fb.group({
          TID: ['', Validators.required],
          Reason: ['', Validators.required],
          Message: ['', Validators.required]
        })

      //获取单个商品的信息
      this.ID = this.routerInFo.snapshot.params['id'];
      this.http.get(sessionStorage['http'] + '/action/OrdersReturns/GetPCInfo?id=' + this.ID+'&uid='+localStorage['uid'], {responseType: 'text'}).subscribe(response => {
        this.model = JSON.parse(response.toString());
        if(parseInt(this.model['State']) >= 5) {
          this.router.navigate(['/admin/order/whole/allorders']);
        }
      }, error => {
        this.router.navigate(['/admin/order/whole/allorders']);
      })
    }

    ngOnInit() {

    }

    //提交
    onSubmit(e){
      e.target.disabled = true;
      this.http.post(sessionStorage['http'] + '/action/OrdersReturns/ShenQingTK/' + this.ID, this.formMobel.value).subscribe(response => {
        this.router.navigate(['/admin/order/return']);
      })
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
