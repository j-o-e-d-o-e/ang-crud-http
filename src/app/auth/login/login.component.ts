import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('form')
  form: NgForm;

  constructor(private authService: AuthService) {
  }

  onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.loginUser(email, password);
  }
}
