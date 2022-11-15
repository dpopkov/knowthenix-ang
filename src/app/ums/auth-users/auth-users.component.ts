import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthUser} from "../../model/AuthUser";
import {Subscription} from "rxjs";
import {AuthUserService} from "../../auth-user.service";
import {NotificationService} from "../../notification.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {CustomHttpResponse} from "../../model/CustomHttpResponse";
import {AuthenticationService} from "../../authentication.service";
import {Router} from "@angular/router";
import {AppUrls} from "../../app-urls";
import {FileUploadStatus} from "../../model/FileUploadStatus";

@Component({
  selector: 'app-auth-users',
  templateUrl: './auth-users.component.html',
  styleUrls: ['./auth-users.component.css']
})
export class AuthUsersComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<string>('User Management');
  public titleAction$ = this.titleSubject.asObservable();
  public users: AuthUser[];
  public user: AuthUser;
  public selectedUser: AuthUser;
  public editUser: AuthUser = new AuthUser();
  public refreshing: boolean;
  public isAdmin: boolean = true;
  public isManager: boolean = true;
  private subscriptions: Subscription[] = [];
  public fileName: string;
  public fileStatus: FileUploadStatus = new FileUploadStatus();
  private profileImage: File;
  private originalUsername: string;

  constructor(private userService: AuthUserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getAuthUserFromLocalCache();
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

  public onEditUser(user: AuthUser) {
    this.editUser = user;
    this.originalUsername = user.username;
    AuthUsersComponent.clickButtonById('openUserEdit');
  }

  public onUpdateUser(): void {
    const formData = this.userService.createUserFormData(this.originalUsername, this.editUser, this.profileImage);
    this.subscriptions.push(this.userService.updateUser(formData).subscribe(
      (response: AuthUser) => {
        AuthUsersComponent.clickButtonById('closeEditUserModalButton');
        this.getUsers(false);
        this.fileName = null;
        this.profileImage = null;
        this.notificationService.notifySuccess(`${response.firstName} ${response.lastName} updated successfully`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.showError(errorResponse);
        this.fileName = null;
        this.profileImage = null;
      }
    ));
  }

  public onDeleteUser(username: string) {
    const deleteConfirmed = confirm(`Are you sure you wish do delete user "${username}" ?`);
    if (deleteConfirmed) {
      this.subscriptions.push(this.userService.deleteUserByUsername(username).subscribe(
        (response: CustomHttpResponse) => {
          this.notificationService.notifySuccess(response.message);
          this.getUsers(false);
        },
        (errorResponse: HttpErrorResponse) => {
          this.showError(errorResponse);
        }
      ));
    }
  }

  public onResetPassword(emailForm: NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['reset-password-email'];
    this.subscriptions.push(this.userService.resetPasswordFor(emailAddress).subscribe(
      (response: CustomHttpResponse) => {
        this.notificationService.notifySuccess(response.message);
        this.refreshing = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.showError(errorResponse);
        this.refreshing = false;
      },
      () => emailForm.reset()
    ));
  }

  public updateProfileImage(): void {
    AuthUsersComponent.clickButtonById('profile-image-input');
  }

  public onUpdateProfileImage() {
    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('profileImage', this.profileImage);
    this.subscriptions.push(this.userService.updateProfileImage(formData).subscribe(
      (event: HttpEvent<AuthUser>) => {
        this.reportUploadProgress(event);
      },
      (errorResponse: HttpErrorResponse) => {
        this.fileStatus.status = 'done';
        this.showError(errorResponse);
      }
    ));
  }

  public onUpdateCurrentUser(currentUser: AuthUser): void {
    this.refreshing = true;
    const formData = this.userService.createUserFormData(this.user.username, currentUser, this.profileImage);
    this.subscriptions.push(this.userService.updateUser(formData).subscribe(
      (response: AuthUser) => {
        this.authenticationService.addAuthUserToLocalCache(response);
        this.getUsers(false);
        this.refreshing = false;
        this.fileName = null;
        this.profileImage = null;
        this.notificationService.notifySuccess(`${response.firstName} ${response.lastName} updated successfully`);
      },
      (errorResponse: HttpErrorResponse) => {
        this.refreshing = false;
        this.showError(errorResponse);
        this.fileName = null;
        this.profileImage = null;
      }
    ));
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.notificationService.notifySuccess("You've successfully logged out!");
    this.router.navigate([AppUrls.AUTH_USER_LOGIN]);
  }

  private reportUploadProgress(event: HttpEvent<AuthUser>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.user.profileImageUrl = `${event.body.profileImageUrl}?time=${new Date().getTime()}`;
          this.notificationService.notifySuccess(`${event.body.firstName}'s profile image updated successfully`);
          this.fileStatus.status = 'done';
        } else {
          this.notificationService.notifyError('Unable to upload image. Please try again');
        }
        break;
      default:
        `Finished all processes`;
    }
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
