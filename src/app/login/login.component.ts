import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(user: string, pass: string): void {
    let username;
    username = user.toLowerCase().trim();
    let password;
    password = pass.trim();
    this.authService.login({username, password} as User)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }
}
