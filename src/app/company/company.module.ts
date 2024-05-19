import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/components/header/header.component';
import { AdminComponent } from './layout/components/admin/admin.component';
import { LeftbarComponent } from './layout/components/leftbar/leftbar.component';
import { RightbarComponent } from './layout/components/rightbar/rightbar.component';
import { TopMenuComponent } from './layout/components/left-top/top-menu.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { CoreModule } from 'src/app/core/core.module';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditDepartmentsComponent } from './departments/edit-departments/edit-departments.component';
import { CreateDepartmentsComponent } from './departments/create-departments/create-departments.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { InvoicesComponent } from './invoices/all-invoices/invoices.component';
import { EditInvoicesComponent } from './invoices/edit-invoices/edit-invoices.component';
import { PaymentsComponent } from './payments/payments.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminComponent,
    LeftbarComponent,
    RightbarComponent,
    TopMenuComponent,
    SubscriptionComponent,
    UsersComponent,
    ProfileComponent,
    DepartmentsComponent,
    ChangePasswordComponent,
    EditDepartmentsComponent,
    CreateDepartmentsComponent,
    CreateUsersComponent,
    EditUsersComponent,
    EditInvoicesComponent,
    InvoicesComponent,
    PaymentsComponent,
    LogComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbModule,
    FullCalendarModule,
    CoreModule,
    RichTextEditorAllModule,
    ChartsModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
})
export class CompanyModule {}
