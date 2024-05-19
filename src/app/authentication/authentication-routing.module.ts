import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login' },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: ':: DMS :: Login ::' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: ':: DMS :: Forgot Password ::' },
      },
      {
        path: 'page-404',
        component: Page404Component,
        data: { title: ':: DMS :: 404 Page Not Found ::' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
