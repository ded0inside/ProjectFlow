import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInForm = new FormGroup({
    login: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
  });

  is_valid(fieldName: string){
    const field = this.signInForm.get(fieldName);
    if (!field?.touched) {
      return ''
    } else if(field.valid) {
      return 'is-valid'
    } else {return 'is-invalid'}
  }

  router = inject(Router);
  constructor(private userSrv: UserService) {}

  get login() {
    return this.signInForm.get('login')
  }
  get password() {
    return this.signInForm.get('password')
  }

  handleSignIn() {
    this.userSrv.login(
      this.signInForm.value.login,
      this.signInForm.value.password
    ).subscribe((res:any) => {
      if (res.result) {
        console.log(res)
        localStorage.setItem("tokenData", JSON.stringify(res));
        this.router.navigateByUrl('/me');
      } else {
        console.log(res.error.detail)
        alert(res.error.detail)
      }
    }, error => {
      console.error('Login failed:', error);
    });
  }
}
