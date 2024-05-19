import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { HomeComponent } from './home/home.component';
import { FoldersComponent } from './folders/folders.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/core/core.module';
import { FilesComponent } from './files/files.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { NestableModule } from 'ngx-nestable';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ApprovalComponent } from './approval/approval.component';


@NgModule({
  declarations: [HomeComponent, FoldersComponent, FilesComponent, SearchComponent, FavoritesComponent, ApprovalComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    // NestableModule,
    PdfViewerModule,
    CoreModule
  ]
})
export class DocumentsModule { }
