import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { FoldersComponent } from './folders/folders.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ApprovalComponent } from './approval/approval.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FoldersComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'folders/:folder_id',
        component: FoldersComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'files/:file_id',
        component: FilesComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'search/:search_val',
        component: SearchComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: { title: '::DMS' },
      },
      {
        path: 'approval',
        component: ApprovalComponent,
        data: { title: '::DMS' },
      },

      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
