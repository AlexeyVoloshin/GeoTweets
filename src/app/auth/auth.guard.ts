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
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {
  }
  canLoad(route: Route): boolean {
    const url: string = route.path;
    console.log('Url:' + url);
    if (url === 'admin') {
      console.log('You are not authorised to visit this page');
      return false;
    }
    return true;
  }
}

    // segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
   // return true;

