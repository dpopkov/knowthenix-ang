import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthUser} from "./model/AuthUser";
import {CustomHttpResponse} from "./model/CustomHttpResponse";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private readonly host = environment.restUserUrl;
  private readonly usersUrl = `${this.host}/user`;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<AuthUser[] | HttpErrorResponse> {
    return this.http.get<AuthUser[]>(this.usersUrl);
  }

  public addUser(formData: FormData): Observable<AuthUser | HttpErrorResponse> {
    return this.http.post<AuthUser>(this.usersUrl, formData);
  }

  public updateUser(formData: FormData): Observable<AuthUser | HttpErrorResponse> {
    return this.http.put<AuthUser>(this.usersUrl, formData);
  }

  public resetPasswordFor(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.put<CustomHttpResponse>(`${this.usersUrl}/resetPassword/${email}`, '');
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<AuthUser> | HttpErrorResponse> {
    return this.http.put<AuthUser>(`${this.usersUrl}/updateProfileImage`, formData,
      {reportProgress: true, observe: 'events'});
  }

  public deleteUserByUsername(username: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.usersUrl}/${username}`);
  }

  public addUsersToLocalCache(users: AuthUser[]): void {
    localStorage.setItem(AuthenticationService.USERS_KEY, JSON.stringify(users));
  }

  public getUsersFromLocalCache(): AuthUser[] {
    const users = localStorage.getItem(AuthenticationService.USERS_KEY);
    if (users) {
      return JSON.parse(users);
    } else {
      return null;
    }
  }

  public createUserFormData(loggedInUsername: string, user: AuthUser, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('username', user.username);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('active', JSON.stringify(user.active));
    formData.append('notLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
