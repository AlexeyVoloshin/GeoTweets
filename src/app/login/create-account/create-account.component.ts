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
      name: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  addUser(data) {
    let name;
    name = data.name.trim();
    let password;
    password = data.password.trim();
    if (!data.name) {
      return;
    }
    console.log('data', name, password);
    this.userService.addUser({name, password} as User)
      .subscribe(user => {
      if (user) {
        this.users.push(user);
      }
    });
  }
}
