import { Component, OnChanges,Input, SimpleChanges } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-carttop',
  templateUrl: './carttop.component.html',
  styleUrls: ['./carttop.component.scss']
})
export class CarttopComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.dataBin();
  }
  @Input()  Refresh;
  Num;
  constructor(public router: Router, public http: HttpClient) {
    this.dataBin();
  }

  dataBin() {
    if (localStorage['uid'] !== null && localStorage['uid'] !== undefined) {
      this.http.get(sessionStorage['http']+'/action/shopcars/getnum/'+localStorage['uid'], {responseType:'text'}).subscribe(data => {
        this.Num = data;
      });
    }
  }

  ngOnInit() {
  }

  cart() {
    this.router.navigate(['/cart']);
  }

  Top() {
    if(document.body.scrollTop > 0){
      document.body.scrollTop = 0;
    }else if(document.documentElement.scrollTop > 0) {
      document.documentElement.scrollTop = 0;
    }
  }

}
