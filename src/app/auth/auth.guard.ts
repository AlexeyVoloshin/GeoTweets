import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const currentUser =   this.authService.currentUserValue;
      const url: string = route.path;
      console.log('Url:' + url);
      if (url === 'admin') {
          if (!currentUser) {
           console.log('You are not authorised to visit this page');
           return  false; // this.authService.isAuth();
        }
      }
      return true;
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    } catch (error) {
      throw error;
    }
  }
}

    // segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
   // return true;

