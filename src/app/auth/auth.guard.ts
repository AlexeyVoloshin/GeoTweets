import {Injectable} from '@angular/core';
import {
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, CanActivate
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  canLoad(route: Route): Promise<boolean> | boolean {
    try {
      const url: string = route.path;
      if (url === 'admin') {
        if (this.authService.currentUserValue !== null) {
          return new Promise<boolean>((resolve, reject) => {
            this.authService.getCurrentUser().subscribe({
              next: (data) => {
                if (data['admin'] === true) {
                  resolve(true);
                } else {
                  this.router.navigate(['/']);
                  resolve(false);
                }
              }, error: (err) => {
                console.log('Admin Guard error: ', err);
                reject();
              }
            });
          });
        } else {
          return false;
        }
      } else {
        return true;
      }
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


