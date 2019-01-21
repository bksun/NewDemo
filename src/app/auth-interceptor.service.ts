import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private Auth: AuthServiceService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    // alert('interceptor working...');
    const authToken = this.Auth.getToken();
    console.log('new token', authToken);
    console.log('----->', authToken);
    const authRequest = req.clone({
      params: req.params.set('accessTokens?access_token', 'Bearer ' + authToken)
    });
    console.log('interceptor token', authRequest.headers, authRequest);
    return next.handle(authRequest);
  }
}
