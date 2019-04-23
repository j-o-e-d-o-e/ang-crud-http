import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('form')
  form: NgForm;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.registerUser(email, password);
  }
}
