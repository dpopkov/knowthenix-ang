import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from "./data.service";

// todo: delete this old AuthService when new AuthenticationService is ready and tested

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  jwtToken: string;
  private userRole: string;

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string) {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.jwtToken = next.result;
        this.userRole = this.parseRole();
        this.dataService.setJwtToken(this.jwtToken);
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      }, error => {
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  getRole(): string {
    return this.userRole;
  }

  private parseRole(): string {
    if (this.jwtToken) {
      const encodedPayload = this.jwtToken.split('.')[1];
      const payload = atob(encodedPayload);
      return JSON.parse(payload).role;
    } else {
      return null;
    }
  }
}
