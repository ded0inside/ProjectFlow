import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  router = inject(Router);
  constructor(private userSrv: UserService) {}

  handleSignIn() {
    this.userSrv.login({
      "username": this.signInForm.value.login,
      "password": this.signInForm.value.password
    }).subscribe((res:any) => {
      if (res.result) {
        localStorage.setItem("tokenData", JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert(res.message)
      }
    })
  }
}
