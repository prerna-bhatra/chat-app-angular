import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IELogin } from './login';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private SignInService: ConfigService) {}

  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]),
    username: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {}

  signinApi() {
    let signinValue = new IELogin();
    signinValue.username = this.form.value.username;
    signinValue.password = this.form.value.password;

    this.SignInService.login(signinValue).subscribe(
      (data) => {
        if (data.isError) {
          alert(data.err);
        } else if (!data.isError) {
          const authObj = {
            isLoggedIn: true,
            access_token: data.result,
          };
          localStorage.setItem('auth_chat', JSON.stringify(authObj));
          alert('successfully loggedin ');
          //  this.router.navigate(['/chats'])
        }
      },

      (err) => {
        console.log({ err });
      },
      () => console.log('request finish')
    );
  }
}
