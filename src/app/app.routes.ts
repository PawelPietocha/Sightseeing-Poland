import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { StartComponent } from './auth/start/start.component';

export const routes: Routes = [
    {
        path:'',
        component: StartComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: LogInComponent
    }
];
