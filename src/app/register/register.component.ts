import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import shajs from 'sha.js';

@Component({
  selector: 'register',  // <register></register>
  styleUrls: [ './register.component.scss' ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public form: FormGroup;

  constructor(formBuilder: FormBuilder,
              private apollo: Apollo) {
    // form model
    this.form = formBuilder.group({
      lastName: ['', [ Validators.required ]],
      firstName: ['', [ Validators.required ]],
      email: ['', [ Validators.required ]],
      password: ['', [ Validators.required ]],
      passwordConfirm: ['', [ Validators.required ]]
    });
    this.apollo = apollo;
  }

  public create() {
    console.log(this.form);

    if (!this.form.valid) {
      return;
    }

    // create account
    this.apollo.mutate({
      mutation: gql`mutation addUser($data: UserInput!) { addUser(data: $data) }`,
      variables: {
        data: {
          firstName: this.form.value.firstName,
          lastName : this.form.value.lastName,
          email : this.form.value.email,
          password : shajs('sha256').update(this.form.value.password).digest('hex')
        }
      }
    }).take(1)
      .subscribe({
        next: ({ data }) => {
          console.log('got a new user', data);
          // get new data
        }, error: (errors) => {
          console.log('there was an error sending the query', errors);
        }
      });
  }

}
