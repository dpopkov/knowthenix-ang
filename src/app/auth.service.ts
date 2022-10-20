import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor() { }

  authenticate(name: string, password: string): boolean {
    if (name === 'James' && password === '12345678') {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
