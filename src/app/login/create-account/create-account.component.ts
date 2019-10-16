import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  items;
  checkoutForm;
  private string: string;
  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(data: any) {

    data.name = data.name.trim();
    data.password = data.password.trim();
    if (!data.name) {
      return;
    }
    console.log(data);
  }
}
