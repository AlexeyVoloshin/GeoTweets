import {Injectable, Input} from '@angular/core';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {User} from '../model/user';
import {UserService} from '../login/user/user.service';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user: User;
  // @Input() user: User;
  constructor(private http: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken(): User {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    return token == null ? [] : token.user;
  }

  login(username: User, password: string) {
    return this.http.login(username, password)
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        console.log('login', user);
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
 async isLoggedIn(): Promise<any> {
  const result = await this.http.getProfileUsers()
      .subscribe(user => {
        let isAdmin = false;
        if (user.admin) {
          console.log('user', user);
          isAdmin = true;
        }
        return isAdmin;
      });
  return result;
  } // method checked authorization
}
