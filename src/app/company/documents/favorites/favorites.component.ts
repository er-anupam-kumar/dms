import { Component, OnInit } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata/fetchdata.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  public files = [];
  
  constructor(
    private fetchDataService: FetchdataService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles() {
    this.fetchDataService.getFavouriteFiles().subscribe((data) => {
      console.log(data); 
      this.files = data.files; 
    });
  }

  deleteFileOrFolder(id, type) {
    return this.fetchDataService.deleteFileOrFolder(id, type);
  }

  openFile = (file_id) => {
    this.router.navigateByUrl('/company/documents/files/' + file_id);
  }
}
