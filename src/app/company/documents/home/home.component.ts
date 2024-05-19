import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata/fetchdata.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UsersService } from 'src/app/services/users/users.service';
import { publish } from 'rxjs/operators';

@Component({
  template: '',
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentFolder: string = '';
  public currentFileId: string = '';
  public isParentFile: string = '';
  public infolder: Boolean = false;
  public isAdmin: string;
  public versions: any;
  public search: string = '';
  public directory: any;
  public userRows: any = [];
  public currentUsermail: string;
  public approval_request: string;
  public my_approval: string;
  public history:any =[];
  public view: string= 'Yes';
  public modify: string= 'Yes';

  filesToUpload: any[] = [];
  progressData: any[] = [];
  message: string[] = [];
  queueLength: number = 0;

  constructor(
    private fetchDataService: FetchdataService,
    private sharedDataService: SharedService,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthenticationService
    ) {}

  ngOnInit(): void {
    let user = this.authService.loggedInUser();
    this.isAdmin = user.is_admin;
    this.currentUsermail = user.email;
    this.sharedDataService.currentData.subscribe(data => {
      this.modify = data.modify,
      this.view = data.view
    });
    this.currentFileId = this.getCurrentFileId();
    if (this.currentFileId) {
      this.getFileVersions();
      this.getAllUser();
    }
  }

  getAllUser() {
    this.usersService.getCompanyApprovalsUsers(this.currentFileId).subscribe((data) => {
      this.userRows = data.users;
    });
  }

  getCurrentFolderId() {
    let id = '';
    this.activeRouter.children.forEach((child) => {
      child.params.subscribe((params) => {
        id = params['folder_id'] ? params['folder_id'].toString() : '';
      });
    });
    return id;
  }

  openFile = (file_id) => {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/company/documents/files/' + file_id);
  };

  getCurrentFileId() {
    let file_id = '';
    this.activeRouter.children.forEach((child) => {
      child.params.subscribe((params) => {
        file_id = params['file_id'] ? params['file_id'].toString() : '';
      });
    });
    return file_id;
  }

  getFileVersions() {
    this.fetchDataService.getFileById(this.currentFileId).subscribe((data) => {
      this.versions = data.versions;
      this.approval_request = data.approval.approval_request;
      this.my_approval = data.approval.my_approval;
      this.history = data.approval.history
      this.isParentFile = data.file.parent_id ? 'No' : 'Yes';
    });
  }

  openModal(id, size) {
    this.modalService.open(id, { size: size });
  }

  addFolder = (value: any) => {
    let parent_id = this.getCurrentFolderId();
    value.parent_id = parent_id;
    this.fetchDataService.addFolder(value).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.modalService.dismissAll();
        this.refreshAll();
      },
      (err) => {
        var message = err.error.message;
        if (
          err.error.errors &&
          err.error.errors[Object.keys(err.error.errors)[0]] &&
          err.error.errors[Object.keys(err.error.errors)[0]][0]
          ) {
          message = err.error.errors[Object.keys(err.error.errors)[0]][0];
      }
      this.toastr.error(message, undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
    }
    );
  };

  attachFile = (event: any) => {
    for (let index = 0; index < event.target.files.length; index++) {
      this.filesToUpload.push(event.target.files[index]);
    }
  };

  uploadFiles(): void {
    if (this.filesToUpload) {
      for (let i = this.queueLength; i < this.filesToUpload.length; i++) {
        this.upload(i, this.filesToUpload[i]);
        this.queueLength++;
      }
    }
  }

  upload = (idx: number, file: File) => {
    this.progressData[idx] = { value: 0, fileName: file.name };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder_id', this.getCurrentFolderId());
    if (this.currentFileId) {
      formData.append('parent_id', this.currentFileId);
    }
    const token = localStorage.getItem('token');
    this.modalService.dismissAll();
    axios
    .post(`${environment.apiUrl}/company/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        this.progressData[idx].value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
          );
      },
    })
    .then((res: any) => {
      const msg = 'Uploaded the file successfully: ' + file.name;
      this.message.push(msg);
      this.modalService.dismissAll();
      this.refreshAll();
    })
    .catch((err: any) => {
      var message = err.response.data.message;
      if (
        err.response.data.errors &&
        err.response.data.errors[Object.keys(err.response.data.errors)[0]] &&
        err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
        ) {
        message =
      err.response.data.errors[
      Object.keys(err.response.data.errors)[0]
      ][0];
    }

    this.progressData[idx].value = 0;
    const msg =
    'Could not upload the file: ' + file.name + '. Error - ' + message;
    this.message.push(msg);

    this.toastr.error(message, undefined, {
      closeButton: true,
      positionClass: 'toast-bottom-center',
    });
  });
  };

  refreshAll() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  hideAddFolderBtn() {
    let url = this.router.url;
    if (
      url.includes('favorites') ||
      url.includes('search') ||
      url.includes('approval') ||
      (this.isAdmin == 'No' && url == '/company/documents')
      ) {
      return false;
  }
  return true;
}

searchEnter = (event) => {
  event.preventDefault();
  if (event.key == 'Enter') {
    return this.searchItem();
  }
};

scroll(id) {
  let el = document.getElementById(id);
  el.scrollIntoView({behavior: "smooth"});
}

approvalFiles(data: any) {
  data.file_id = this.currentFileId;
  this.fetchDataService.postApproval(data).subscribe(
    (res) => {
      this.toastr.success(res.message, undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
      this.modalService.dismissAll();
      this.refreshAll();
    },
    (err) => {
      var message = err.error.message;
      if (
        err.error.errors &&
        err.error.errors[Object.keys(err.error.errors)[0]] &&
        err.error.errors[Object.keys(err.error.errors)[0]][0]
        ) {
        message = err.error.errors[Object.keys(err.error.errors)[0]][0];
    }
    this.toastr.error(message, undefined, {
      closeButton: true,
      positionClass: 'toast-bottom-center',
    });
  }
  );
}

searchItem() {
  this.search = this.search.trim();
  if (this.search) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/company/documents/search/${this.search}`]);
  }
}

updateApprovalFiles(data: any, status:string) {
  data.status = status;
  this.fetchDataService.updateApproval(this.currentFileId, data).subscribe(
    (data) => {
      this.toastr.success(data.message, undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
      this.modalService.dismissAll();
      this.refreshAll();
    },
    (err) => {
      var message = err.error.message;
      if (
        err.error.errors &&
        err.error.errors[Object.keys(err.error.errors)[0]] &&
        err.error.errors[Object.keys(err.error.errors)[0]][0]
        ) {
        message = err.error.errors[Object.keys(err.error.errors)[0]][0];
    }
    this.toastr.error(message, undefined, {
      closeButton: true,
      positionClass: 'toast-bottom-center',
    });
  }
  );
}
}
