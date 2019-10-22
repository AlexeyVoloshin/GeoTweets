import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { User } from '../../model/user';
import { environment} from '../../../environments/environment';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.apiUrl;
  users: Array<User> = [];
  constructor(
    private _http: ApiService
  ) { }

  getUsers() {
    return this._http.get(`${this.userUrl}/users`, this.users);
  }
  addUser(username: User): Observable<User> {
    const url = `${this.userUrl}/users`;
    return this._http.post(url, username);
  }
  login(username: User, password: string): Observable<User> {
    const url = `${this.userUrl}/auth/login`;
    return this._http.post(url, {username, password});
  }
}
