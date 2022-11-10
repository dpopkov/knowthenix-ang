import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthUser} from "./model/AuthUser";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public static readonly USERS_KEY = 'uOIfd87d6aSjLz';
  public static readonly TOKEN_KEY = 'ld9zGd8ld8Tl';
  public static readonly USER_KEY = 'ucu6RysCo35';

  public readonly host = environment.restUserUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public register(user: AuthUser): Observable<AuthUser | HttpErrorResponse> {
    return this.http.post<AuthUser | HttpErrorResponse>(`${this.host}/user/register`, user);
  }

  public login(user: AuthUser): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user,
      {observe: 'response'}); // adding "observe:'response'" in order to get the whole response, not only body
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem(AuthenticationService.USER_KEY);
    localStorage.removeItem(AuthenticationService.TOKEN_KEY);
    localStorage.removeItem(AuthenticationService.USERS_KEY);
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
  }

  public addAuthUserToLocalCache(user: AuthUser): void {
    localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(user));
  }

  public getAuthUserFromLocalCache(): AuthUser {
    return JSON.parse(localStorage.getItem(AuthenticationService.USER_KEY));
  }

  public loadTokenFromLocalStorage(): void {
    this.token = localStorage.getItem(AuthenticationService.TOKEN_KEY);
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadTokenFromLocalStorage();
    if (this.token != null && this.token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      const username = decodedToken.sub;
      if (username != null && username !== '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = username;
          return true;
        } else {
          console.log('AuthenticationService: token is expired');
          return false;
        }
      }
    } else {
      this.logOut();
    }
    return false;
  }
}
