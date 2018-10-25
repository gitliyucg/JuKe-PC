import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public UserID: number;
  public information: object = [];

  constructor(
      public http: HttpClient,
  ) { }

  ngOnInit() {
      this.UserID = localStorage.uid;
      this.http.get(sessionStorage['http'] + '/action/Users/GetUser/' + this.UserID).subscribe( response => {
          this.information = response;
      })
  }

}
