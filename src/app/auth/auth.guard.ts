import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, CanActivate
} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {error} from 'util';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  currentUser: User;
  constructor(private router: Router, private authService: AuthService) {
  }
   canLoad(route: Route): boolean {
    try {
    //  this.authService.currentUser.subscribe(user => this.currentUser = user);

      const url: string = route.path;
    //  console.log('currentUser_Guard:' + this.currentUser);
      const currentUser = this.authService.currentUserValue; // .subscribe(user => this.currentUser = user);
     // console.log('currentUser_Guard:' + currentUser);
    //  console.log('currentUser_Guard:' + this.currentUser);
      console.log('Url:' + url);

      if (url === 'admin' && currentUser !== null) {
       // if(this.authService.isLoggedIn())
       const result = this.authService.isLoggedIn();

        console.log('result:', result);
          if (!result) {
           console.log('You are not authorised to visit this page');
           return  false; // this.authService.isAuth();
        }
       return true;
      }
      if (url !== 'admin')
        return true;
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    } catch (error) {
      throw error;
    }

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const currentUser = this.authService.currentUserValue;
    console.log('canActivate:' + currentUser);
    if (currentUser) {
      // logged in so return true
      return true;
    }
    return false;
  }
}

    // segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
   // return true;

