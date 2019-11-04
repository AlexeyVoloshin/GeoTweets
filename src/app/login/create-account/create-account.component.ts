import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  users: Array<User> = [];
  checkoutForm;
  returnUrl: string;
  constructor(private userService: UserService, private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
  }

  onSubmit(user: string, pass: string) {
    let username;
    username = user.trim().toLowerCase();
    let password;
    password = pass.trim();
    if (!username && !password) {
      return;
    }
    console.log('data', username, password);
    this.userService.addUser({username, password} as User)
      .subscribe(data => {
      if (data) {
        this.users.push(data);
        this.router.navigate([this.returnUrl]);
      }
    });
  }
}
