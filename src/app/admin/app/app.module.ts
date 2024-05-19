import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CoreModule } from 'src/app/core/core.module';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { CKEditorModule } from 'ckeditor4-angular';
import { CreateRegistrationComponent } from './components/registration/create-registration/create-registration.component';
import { AllRegistrationComponent } from './components/registration/all-registration/all-registration.component';
import { CreatePlansComponent } from './components/plans/create-plans/create-plans.component';
import { AllPlansComponent } from './components/plans/all-plans/all-plans.component';
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { InvoicesComponent } from './components/invoices/all-invoices/invoices.component';
import { CreateAddOnsComponent } from './components/add-ons/create-add-ons/create-add-ons.component';
import { AllAddOnsComponent } from './components/add-ons/all-add-ons/all-add-ons.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditAddOnsComponent } from './components/add-ons/edit-add-ons/edit-add-ons.component';
import { EditInvoicesComponent } from './components/invoices/edit-invoices/edit-invoices.component';
import { EditPlansComponent } from './components/plans/edit-plans/edit-plans.component';
import { EditRegistrationComponent } from './components/registration/edit-registration/edit-registration.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRegistrationComponent,
    AllRegistrationComponent,
    CreatePlansComponent,
    AllPlansComponent,
    CreateUsersComponent,
    AllUsersComponent,
    InvoicesComponent,
    CreateAddOnsComponent,
    AllAddOnsComponent,
    EditAddOnsComponent,
    EditInvoicesComponent,
    EditPlansComponent,
    EditRegistrationComponent,
    EditUsersComponent,
    ChangePasswordComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
    RichTextEditorAllModule,
    FullCalendarModule,
    CoreModule,
    ChartsModule,
    NgxEchartsModule,
    CKEditorModule,
    FormsModule,
    NgxDatatableModule,
  ],
})
export class AppModule {}
