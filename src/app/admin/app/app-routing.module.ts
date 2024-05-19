import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { CreateRegistrationComponent } from './components/registration/create-registration/create-registration.component';
import { AllRegistrationComponent } from './components/registration/all-registration/all-registration.component';
import { EditRegistrationComponent } from './components/registration/edit-registration/edit-registration.component';
import { CreatePlansComponent } from './components/plans/create-plans/create-plans.component';
import { AllPlansComponent } from './components/plans/all-plans/all-plans.component';
import { EditPlansComponent } from './components/plans/edit-plans/edit-plans.component';
import { AllAddOnsComponent } from './components/add-ons/all-add-ons/all-add-ons.component';
import { CreateAddOnsComponent } from './components/add-ons/create-add-ons/create-add-ons.component';
import { EditAddOnsComponent } from './components/add-ons/edit-add-ons/edit-add-ons.component';
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { InvoicesComponent } from './components/invoices/all-invoices/invoices.component';
import { EditInvoicesComponent } from './components/invoices/edit-invoices/edit-invoices.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'create-registration', pathMatch: 'full' },
      { path: 'create-registration', component: CreateRegistrationComponent },
      { path: 'create-plans', component: CreatePlansComponent },
      { path: 'create-add-ons', component: CreateAddOnsComponent },
      { path: 'create-users', component: CreateUsersComponent },
      { path: 'all-add-ons', component: AllAddOnsComponent },
      { path: 'all-registration', component: AllRegistrationComponent },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'all-plans', component: AllPlansComponent },
      { path: 'view-invoices/:id', component: EditInvoicesComponent },
      { path: 'edit-users/:id', component: EditUsersComponent },
      { path: 'edit-addOns/:id', component: EditAddOnsComponent },
      { path: 'edit-registration/:id', component: EditRegistrationComponent },
      { path: 'edit-plans/:id', component: EditPlansComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
