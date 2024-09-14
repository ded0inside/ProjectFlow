import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NEVER } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surename: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  handleSignUp() {
    alert(
      this.signUpForm.value.name + ' | ' + this.signUpForm.value.surename + ' | ' + this.signUpForm.value.username + ' | ' + this.signUpForm.value.email + ' | ' + this.signUpForm.value.password
    );
  }
}
