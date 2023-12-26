import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { StartComponent } from './auth/start/start.component';
import { HomeComponent } from './home/home.component';
import { MountainsHomeComponent } from './mountains/mountains-home/mountains-home.component';
import { ParksHomeComponent } from './parks/parks-home/parks-home.component';

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
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'mountains',
        component: MountainsHomeComponent
    },
    {
        path: 'parks',
        component: ParksHomeComponent
    }
];
