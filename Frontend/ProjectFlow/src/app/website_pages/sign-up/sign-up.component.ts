import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../validators/form.validators';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  router = inject(Router)
  constructor(private userSrv: UserService) {}
  titleTouched: boolean = false;
  touchTitle() {
    this.titleTouched = true;
  }
  changeTitle(title: string) {
    this.signUpForm.get('title')?.setValue(title);
  };
  checkClass() {
    const titleButton = document.querySelector('#titleButton');
    if (titleButton) {
      return titleButton.classList.contains('is-invalid')
    }
    return false
  };
  
  is_valid(fieldName: string){
    const field = this.signUpForm.get(fieldName);
    if (!field?.touched) {
      return ''
    } else if(field.valid) {
      return 'is-valid'
    } else {return 'is-invalid'}
  }

  signUpForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    surename: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: [
      CustomValidators.matchPasswords('password', 'confirmPassword'),
    ]
  });

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get username() {
    return this.signUpForm.get('username')
  }

  get firstname() {
    return this.signUpForm.get('name')
  }
  get surename() {
    return this.signUpForm.get('surename')
  }

  get title(){
    return this.signUpForm.get('title')
  }

  handleSignUp() {
    this.userSrv.singUp({
      "first_name": this.signUpForm.value.name,
      "last_name": this.signUpForm.value.surename,
      "username": this.signUpForm.value.username,
      "email": this.signUpForm.value.email,
      "password": this.signUpForm.value.password
    }).subscribe((res:any) => {
      if (res.result) {
        this.userSrv.login(this.signUpForm.value.username, this.signUpForm.value.password).subscribe(
          (res:any) => {
            if (res.result) {
              localStorage.setItem("tokenData", JSON.stringify(res));
              this.router.navigateByUrl('/me');
            } else {
              alert(res.detail)
            }
          }
        )
      } else {
        alert(res.detail)
      }
    })
  };
}
