import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, CanActivate
} from '@angular/router';
import {AuthService} from './auth.service';
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

      const currentUser = this.authService.currentUserValue;
      console.log('Url:' + url);
      if (url === 'admin' && currentUser !== null) {

        const result = this.authService.isAdminIn();

        console.log('result:', result);
        if (!result) {
          console.log('You are not authorised to visit this page');
          return false;
        }
        return true;
      }
      if (url !== 'admin')
        return true;
    } catch (error) {
      throw error;
    }

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    console.log('canActivate:' + currentUser);
    if (currentUser) {
      // logged in so return true
      return true;
    }
    return false;
  }
}


