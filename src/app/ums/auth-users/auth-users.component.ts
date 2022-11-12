import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthUser} from "../../model/AuthUser";
import {Subscription} from "rxjs";
import {AuthUserService} from "../../auth-user.service";
import {NotificationService} from "../../notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css']
})
export class AuthUsersComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users: AuthUser[];
  public selectedUser: AuthUser;
  public refreshing: boolean;
  public isAdmin: boolean = true;
  private subscriptions: Subscription[] = [];
  public fileName: string;
  private profileImage: File;

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

  public searchUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
      return;
    }
    const search = searchTerm.toLowerCase();
    const result: AuthUser[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName.toLowerCase().indexOf(search) !== -1
        || user.lastName.toLowerCase().indexOf(search) !== -1
        || user.username.toLowerCase().indexOf(search) !== -1
        || user.email.toLowerCase().indexOf(search) !== -1
        || user.publicId.toLowerCase().indexOf(search) !== -1) {
        result.push(user);
      }
    }
    this.users = result;
    if (result.length === 0) {
      this.users = this.userService.getUsersFromLocalCache();
    }
  }

  public onSelectUser(appUser: AuthUser) {
    this.selectedUser = appUser;
    AuthUsersComponent.clickButtonById('openUserInfo');
  }

  public onProfileImageChange(event: Event) {
    const target = event.target;
    // @ts-ignore
    if (target.files.length === 1) {
      // @ts-ignore
      const file = target.files[0];
      this.fileName = file.name;
      this.profileImage = file;
    }
  }

  public saveNewUser(): void {
    AuthUsersComponent.clickButtonById('new-user-save');
  }

  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFormData(null, userForm.value, this.profileImage);
    this.subscriptions.push(this.userService.addUser(formData).subscribe(
      (response: AuthUser) => {
        AuthUsersComponent.clickButtonById('new-user-close');
        this.getUsers(false);
        this.fileName = null;
        this.profileImage = null;
        userForm.reset();
        this.notificationService.notifySuccess(`${response.firstName} ${response.lastName} added successfully`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.showError(errorResponse);
        this.fileName = null;
        this.profileImage = null;
      }
    ));
  }

  public onEditUser(appUser: AuthUser) {
    console.log('Not implemented yet');
  }

  public onDeleteUser(username: string) {
    console.log('Not implemented yet');
  }

  private static clickButtonById(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  private showError(errorResponse: HttpErrorResponse): void {
    if (errorResponse.error.message) {
      this.notificationService.notifyError(errorResponse.error.message);
    } else {
      this.notificationService.notifyError('An error occurred. Please try again');
    }
  }
}
