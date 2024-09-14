import { Routes } from '@angular/router';
import { HomeComponent } from './website_pages/home/home.component';
import { SignUpComponent } from './website_pages/sign-up/sign-up.component';
import { SignInComponent } from './website_pages/sign-in/sign-in.component';
import { LayoutComponent } from './website_pages/layout/layout.component';
import { UserComponent } from './user_pages/user/user.component';
import { WebsiteLayoutComponent } from './user_pages/website-layout/website-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: WebsiteLayoutComponent,
        children:[
            {
                path: 'home',
                title: 'ProjectFlow',
                component: HomeComponent
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
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: UserComponent
            }
        ]
    }
];