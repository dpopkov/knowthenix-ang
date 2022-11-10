import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl = httpRequest.url;
    const host = this.authenticationService.host;
    if (requestUrl.includes(`${host}/user/login`)
      || requestUrl.includes(`${host}/user/register`)) {
      return httpHandler.handle(httpRequest);
    }
    this.authenticationService.loadTokenFromLocalStorage();
    const token = this.authenticationService.getToken();
    const requestWithToken = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    return httpHandler.handle(requestWithToken);
  }
}
