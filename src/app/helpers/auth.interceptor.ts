import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService} from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // currentUser: User;
  constructor(private authService: AuthService, private http: HttpClient) {
  }
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
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
