import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../authentication.service";
import {NotificationService} from "../notification.service";
import {AppUrls} from "../app-urls";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([AppUrls.AUTH_USER_LOGIN], {queryParams: {requested: state.url}});
    this.notificationService.notifyWarning('Please log in to access this page.');
    return false;
  }
}
