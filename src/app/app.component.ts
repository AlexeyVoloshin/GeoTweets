import { Component } from '@angular/core';
import { User } from './model/user';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  title = 'geo-tweets';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    debugger
    console.log('currentUser', this.authService.currentUser)
    this.authService.currentUser.subscribe(user => this.currentUser = user);

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
