import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-annview',
  templateUrl: './annview.component.html',
  styleUrls: ['./annview.component.scss']
})
export class AnnviewComponent implements OnInit {
  id = 0;
  model: object = [];
  constructor(public http: HttpClient, private routerInfo: ActivatedRoute,private router: Router) {
    this.id = routerInfo.snapshot.params['id'];
    if(this.id > 0 ) {
      http.get(sessionStorage['http']+'/action/news/getview/'+this.id).subscribe(data => {
        this.model = data;
      });
    }else {
      router.navigate(['/admin/index']);
    }
  }

  ngOnInit() {
  }

}
