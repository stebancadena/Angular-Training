import { Injectable } from '@angular/core';
import { Url } from 'url';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  constructor() { }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName,
        isAdmin: true
      };
      return;
    }
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
  }

  logout(): void {
    this.currentUser = undefined;
  }
}
