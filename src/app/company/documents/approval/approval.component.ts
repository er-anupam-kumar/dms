import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FetchdataService} from 'src/app/services/fetchdata/fetchdata.service'

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements OnInit {

  public files = [];
  
  constructor(
    private fetchDataService: FetchdataService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getApproval();
  }

  getApproval() {
    this.fetchDataService.getApprovalFiles().subscribe((data) => { 
      this.files = data.files; 
      // console.log(data.files)
    });
  }

  deleteFileOrFolder(id, type) {
    return this.fetchDataService.deleteFileOrFolder(id, type);
  }

  openFile = (file_id) => {
    this.router.navigateByUrl('/company/documents/files/' + file_id);
  }
}
