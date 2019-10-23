import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  users: Array<User> = [];
  checkoutForm;
  constructor(private userService: UserService, private formBuilder: FormBuilder, ) {
    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  addUser(data) {
    let username;
    username = data.username.trim();
    let password;
    password = data.password.trim();
    if (!data.username) {
      return;
    }
    console.log('data', username, password);
    this.userService.addUser({username, password} as User)
      .subscribe(user => {
      if (user) {
        this.users.push(user);
      }
    });
  }
}
