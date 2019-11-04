import { Component } from '@angular/core';
import { User } from './model/user';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
