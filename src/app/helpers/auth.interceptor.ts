import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService} from '../auth/auth.service';
import {User} from "../model/user";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // currentUser: User;

  constructor(private authService: AuthService, private http: HttpClient) {
  }
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    // this.authService.currentUser.subscribe(user => this.currentUser = user);
    const currentUser = this.authService.currentUserValue; // .subscribe(user => this.currentUser = user);
    console.log('AuthInterceptor:' + currentUser);
    // console.log('AuthInterceptor:' + this.currentUser);
    // this.authService.currentUser.subscribe(user => this.currentUser = user);
    console.log('jwt', currentUser);
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }

}
