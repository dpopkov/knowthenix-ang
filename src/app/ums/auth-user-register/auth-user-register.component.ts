import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication.service";
import {NotificationService} from "../../notification.service";
import {AppUrls} from "../../app-urls";
import {AuthUser} from "../../model/AuthUser";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-user-register',
  templateUrl: './auth-user-register.component.html',
  styleUrls: ['./auth-user-register.component.css']
})
export class AuthUserRegisterComponent implements OnInit, OnDestroy {

  public showLoading: boolean;
  public loginUrl = AppUrls.AUTH_USER_LOGIN;
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

  onRegister(user: AuthUser) {
    this.showLoading = true;
    this.subscriptions.push(
      this.authService.register(user).subscribe(
        (regUser: AuthUser) => {
          this.notificationService.notifySuccess(`A new account was created for ${regUser.username}.
          Pleas check your email for generated password to log in.`);
          this.showLoading = false;
          this.router.navigateByUrl(AppUrls.AUTH_USER_LOGIN);
        },
        (errorResponse: HttpErrorResponse) => {
          this.showRegisterError(errorResponse);
          this.showLoading = false;
        }
      )
    );
  }

  private showRegisterError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.message) {
      this.notificationService.notifyError(errorResponse.error.message);
    } else {
      this.notificationService.notifyError('An error occurred when registering. Please try again');
    }
  }
}
