import { Component, OnInit } from '@angular/core';
import { User} from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[] = [
    {_id: '1', name : 'Alexey', password : '123456'}
  ];
  constructor() { }

  ngOnInit() {
  }

  login(login: string, pass: string) {
        //if (login === this.users ){}
  }
}
