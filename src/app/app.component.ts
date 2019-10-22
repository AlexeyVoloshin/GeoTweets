import { Component } from '@angular/core';
import { User } from "./model/user";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

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
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
