import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthUser} from "../../model/AuthUser";
import {Subscription} from "rxjs";
import {AuthUserService} from "../../auth-user.service";
import {NotificationService} from "../../notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css']
})
export class AuthUsersComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: AuthUser[];
  public refreshing: boolean;
  public isAdmin: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(private userService: AuthUserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getUsers(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean) {
    this.refreshing = true;
    this.subscriptions.push(this.userService.getUsers().subscribe(
      (response: AuthUser[]) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing = false;
        if (showNotification) {
          this.notificationService.notifySuccess(`${response.length} user(s) loaded successfully`);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.showError(errorResponse);
        this.refreshing = false;
      }
    ))
  }

  public searchUsers(value: any) {
    console.log('Not implemented yet');
  }

  public onSelectUser(appUser: AuthUser) {
    console.log('Not implemented yet');
  }

  public onEditUser(appUser: AuthUser) {
    console.log('Not implemented yet');
  }

  public onDeleteUser(username: string) {
    console.log('Not implemented yet');
  }

  private showError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.message) {
      this.notificationService.notifyError(errorResponse.error.message);
    } else {
      this.notificationService.notifyError('An error occurred. Please try again');
    }
  }
}
