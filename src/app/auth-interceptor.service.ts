import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
   user = undefined;
  constructor( private Auth: AuthServiceService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    // let authToken = this.Auth.getToken(); //
    // if( authToken === 'undefined' ||  authToken == 'null') {
    //   this.tokenAccess();
    //   authToken = this.user; 
    // }
    
    alert('auth interceptor');
    this.user  = localStorage.getItem('user');
    let authToken = this.user;
    console.log('Before Token Length - interceptor', authToken, authToken.length);
    if(authToken.length > 3){
      alert('auth saved');
      this.Auth.refreshLogin();
      console.log('new token - interceptor', authToken);
      console.log('this.user - interceptor', this.user);
      const authRequest = req.clone({
        params: req.params.set('access_token', ('' + authToken).trim())
      });
  
  //    console.log('interceptor token', authRequest);
      return next.handle(authRequest);
      }

      const authRequest = req.clone({
        params: req.params.set('access_token', ('' + authToken).trim())
      });
      return next.handle(authRequest);
  }

  tokenAccess(): boolean {
        // alert('token access..')  
     this.user  = localStorage.getItem('user');
    if(this.user !== 'undefined' || this.user == 'null') {
       this.user = localStorage.getItem('user');
      console.log('user:', this.user);
      this.Auth.refreshLogin();
      return true;
    }             
    
    return false;
  }
}
