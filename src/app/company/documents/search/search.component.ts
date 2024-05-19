import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata/fetchdata.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild(DatatableComponent) myFilterTable: DatatableComponent;
  rows = [];
  constructor(
    private fetchDataService: FetchdataService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSearchFiles()
  }

  openFile = (file_id) => {
    this.router.navigateByUrl('/company/documents/files/' + file_id);
  };
  
  getSearchFiles(){
    this.fetchDataService.getSearchFiles(this.activeRoute.snapshot.params.search_val).subscribe((data) => {
      this.rows = data.files;
    });
  }

  deleteFile(id, type) {
    return this.fetchDataService.deleteFileOrFolder(id, type);
   }
 
  downLoadFile(file_id) {
    window.open(environment.apiUrl+'/download-file/'+file_id,'_parent'); 
  }
}
