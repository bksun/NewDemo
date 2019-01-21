import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './signup/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string;
  private AuthStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor( public http: HttpClient, private router: Router) { }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.AuthStatusListener.next(false);
    this.router.navigate(['/home']);
  }

  refreshLogin() {
      this.isAuthenticated = true;
      this.AuthStatusListener.next(true);
      this.router.navigate(['/home']);
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.AuthStatusListener.asObservable();
  }

  createUser( email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('https://bksun.herokuapp.com/api/Users', authData)
    .subscribe(result => {
      console.log('api result', result);
    });
  }

  loginUser( email: string, password: string) {
    //console.log('log in data called');
     const authData: AuthData = { email: email, password: password };
    this.http.post<{id: string}> ('https://bksun.herokuapp.com/api/Users/login', authData)
    .subscribe(result => {
      // console.log('api login result', result.id);
      const tempToken = result.id;
      this.token = tempToken;

      if (this.token) {
        localStorage.setItem('user', JSON.stringify(this.token));
        const user  = localStorage.getItem('user');
        console.log('user:', user);
        this.isAuthenticated = true;
        this.AuthStatusListener.next(true);
        this.router.navigate(['/home']);
      }
      
      const user  = localStorage.getItem('user');
        if(user !== 'undefined') {
          const user  = localStorage.getItem('user');
          console.log('user:', user);
          this.isAuthenticated = true;
          this.AuthStatusListener.next(true);
          this.router.navigate(['/home']);
        }

    });
  }
}
