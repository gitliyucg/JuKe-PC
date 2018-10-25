import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
//
@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  login(): Observable<boolean> {
    if (localStorage['uid'] === null || localStorage['uid'] === undefined) {
      return Observable.of(true).do(val => this.isLoggedIn = false);
    }
    this.isLoggedIn = true;
    return Observable.of(true);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.redirectUrl = '';
    localStorage.clear();
  }

}
