import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/components/admin/admin.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { CreateDepartmentsComponent } from './departments/create-departments/create-departments.component';
import { EditDepartmentsComponent } from './departments/edit-departments/edit-departments.component';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { InvoicesComponent } from './invoices/all-invoices/invoices.component';
import { EditInvoicesComponent } from './invoices/edit-invoices/edit-invoices.component';
import { PaymentsComponent } from './payments/payments.component';
import { LogComponent } from './log/log.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./documents/documents.module').then((m) => m.DocumentsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'subscription',
        component: SubscriptionComponent,
        data: { title: '::DMS' },
      },
      { path: 'users', component: UsersComponent, data: { title: '::DMS' } },
      {
        path: 'log/:id',
        component: LogComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'log',
        component: LogComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'create-users',
        component: CreateUsersComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'edit-users/:id',
        component: EditUsersComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'create-departments',
        component: CreateDepartmentsComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'edit-departments/:id',
        component: EditDepartmentsComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'edit-invoices/:id',
        component: EditInvoicesComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
