import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-payok',
  templateUrl: './payok.component.html',
  styleUrls: ['./payok.component.scss']
})
export class PayokComponent implements OnInit {
  id;
  token;
  constructor(public router: Router, public info: ActivatedRoute) {
    this.id = info.snapshot.params['id'];
    this.token = info.snapshot.params['t'];
    let md5 = Md5.hashStr(this.id+'menglong0526@jukePC');
    if(this.token != md5)
    {
      router.navigate(['/index']);
    }
  }

  ngOnInit() {
  }

}
