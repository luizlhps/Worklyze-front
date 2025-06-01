import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './_features/header/header.component';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
