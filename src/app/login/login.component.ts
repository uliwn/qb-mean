import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import shajs from 'sha.js';

@Component({
  selector: 'login',  // <login></login>
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private form: FormGroup;

  constructor(formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
    // form model
    this.form = formBuilder.group({
      email: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]]
    });
  }

  private login() {
    const body = {
      username: this.form.value.email,
      password: shajs('sha256').update(this.form.value.password).digest('hex')
    };

    console.log('post body...', body);

    this.http.post('http://localhost:4040/api/auth/login', body).subscribe(
      (data) => {
        console.log('login success!', data);
        this.router.navigate(['/']);
      },
      () => {
        this.form.reset();
      }
    );
  }

}
