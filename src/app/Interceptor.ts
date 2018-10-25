import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse} from '@angular/common/http';
import {Observable} from "Rxjs";
import 'rxjs/add/operator/do';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(evt => {
      if(evt instanceof HttpResponse) {
      }
    },(error: any) => {
      if(error.status === 200)
      {
        alert('后台返回了字符串类型，请改用http而不是httpclient');
      }
      if(error.status === 400)
      {
        // alert(JSON.parse(error.error).Message);
      }
      if(error.status === 404)
      {
        alert('服务器已断开或请求不存在');
      }
      if(error.status === 500)
      {
        //alert('因为意外情况，服务器不能完成请求');
      }
    });
  }
}
