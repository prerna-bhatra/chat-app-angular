import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IESignup } from './signup';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private SignUpService: ConfigService , private router:Router) {}

  form = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]),
    username: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {}

  signupApi() {
    let signupValue = new IESignup();
    signupValue.fullname = this.form.value.fullname;
    signupValue.username = this.form.value.username;
    signupValue.password = this.form.value.password;

    this.SignUpService.signup(signupValue).subscribe(
      (data) => {
        if (data.isError) {
          alert(data.err);
        } else if (!data.isError) alert('successfully signup ');
         this.router.navigate(['/login'])
      },
      (err) => {
        console.log({ err });
        // alert('email already exists');
      },
      () => console.log('request finish')
    );
  }

  get fullname() {
    return this.form.get('fullname');
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
}
