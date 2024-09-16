import { Routes } from '@angular/router';
import { HomeComponent } from './website_pages/home/home.component';
import { SignUpComponent } from './website_pages/sign-up/sign-up.component';
import { SignInComponent } from './website_pages/sign-in/sign-in.component';
import { LayoutComponent } from './user_pages/layout/layout.component';
import { UserComponent } from './user_pages/user/user.component';
import { WebsiteLayoutComponent } from './website_pages/website-layout/website-layout.component';
import { DashboardComponent } from './user_pages/dashboard/dashboard.component';
import { TasksComponent } from './user_pages/tasks/tasks.component';
import { SettingsComponent } from './user_pages/settings/settings.component';

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
                component: DashboardComponent
            },
            {
                path: 'me',
                component: UserComponent
            },
            {
                path: 'tasks',
                component: TasksComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
        ]
    }
];