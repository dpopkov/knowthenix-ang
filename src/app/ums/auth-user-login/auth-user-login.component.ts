import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication.service";
import {NotificationService} from "../../notification.service";
import {AppUrls} from "../../app-urls";
import {AuthUser} from "../../model/AuthUser";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../model/HeaderType.enum";

@Component({
  selector: 'app-auth-user-login',
  templateUrl: './auth-user-login.component.html',
  styleUrls: ['./auth-user-login.component.css']
})
export class AuthUserLoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  public registerUrl = AppUrls.AUTH_USER_REGISTER;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl(AppUrls.USERS_MANAGEMENT);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onLogin(user: AuthUser): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<AuthUser>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          this.authService.addAuthUserToLocalCache(response.body);
          this.router.navigateByUrl(AppUrls.USERS_MANAGEMENT);
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log('Error logging in:', errorResponse);
          this.showLoginError(errorResponse);
          this.showLoading = false;
        }
      )
    )
  }

  private showLoginError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.message) {
      this.notificationService.notifyError(errorResponse.error.message);
    } else {
      this.notificationService.notifyError('An error occurred when logging in. Please try again');
    }
  }
}
