import { Component, OnInit } from '@angular/core';
import { User} from '../model/user';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // users: User[] = [
  //   {_id: '1', name : 'Alexey', password : '123456'}
  // ];
  returnUrl: string;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(username: User, password: string) {
       this.authService.login(username, password)
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
