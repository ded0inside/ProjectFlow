import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        title: 'ProjectFlow',
        component: HomeComponent,
    },
    {
        path: 'sign-up',
        title: 'Sign Up',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        title: 'Sign In',
        component: SignInComponent
    },
];