import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata/fetchdata.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  @ViewChild('shareFileForm') shareFileForm: NgForm;
  @ViewChild('postCommentForm') postCommentForm: NgForm;
  @ViewChild('renameFileForm') renameFileForm: NgForm;
  buttonDisabled = false;
  public deletable: string;
  public created_at: string;
  public created_by: string;
  public name: string;
  public path: string;
  public type: any = '';
  public size: string;
  public where: string;
  public updated_at: string;
  public comment: Array<any> = [];
  public file_id;
  public folder_id;
  public versions: string;
  public dataFavourite: string;
  public tagsInput: string = '';
  public tags: any = [];
  public history:any =[];
  public directory:any =[];
  public view: string = 'No';
  public modify: string = 'No';
  constructor(
    private fetchDataService: FetchdataService,
    private sharedDataService: SharedService,
    private actionRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private location: Location,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.getFile();
    this.sharedDataService.currentData.subscribe(data => {
      this.modify = data.modify,
      this.view = data.view
    });
  }

  getFile() {
    this.fetchDataService
    .getFileById(this.actionRoute.snapshot.params.file_id)
    .subscribe(
      (data) => {
        this.name = data.file.name;
        this.path = data.file.path;
        this.type = data.file.type;
        this.size = data.file.size;
        this.where = data.file.location;
        this.directory = data.file.directory;
        this.deletable = data.file.deletable;
        this.created_by = data.file.created_by;
        this.created_at = data.file.created_at;
        this.updated_at = data.file.updated_at;
        this.comment = data.file.comments;
        this.versions = data.versions;
        this.file_id = data.file.id;
        this.folder_id = data.file.folder_id;
        this.dataFavourite = data.file.favourite;
        this.tags = data.file.tags;
        this.history = data.approval.history;
        this.sharedDataService.changeData({
          modify: data.file.modify,
          view: data.file.modify
        });
      },
      (err) => {
        this.toastr.error('No such file exist.', undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
      }
      );
  }

  favoriteAction(id, type) {
    let favoriteData = { favourite: type };
    return this.fetchDataService.updateFile(id, favoriteData);
  }

  postComment(data: any) {
    data['file_id'] = this.file_id;
    this.fetchDataService.postComment(data).subscribe(
      (data) => {
        this.toastr.success(data.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        (<HTMLInputElement>document.getElementById('comment_area')).value = '';
        this.ngOnInit();
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

  openModal(id, type) {
    this.modalService.open(id, { size: type });
  }

  deleteFile(id, type) {
    return this.fetchDataService.deleteFileOrFolder(id, type);
  }

  renameFiles(data: any) {
    return this.fetchDataService.updateFile(
      this.actionRoute.snapshot.params.file_id,
      data
      );
  }

  downLoadFile() {
    window.open(environment.apiUrl + '/download-file/' + this.file_id,'_parent');
  }

  tagsEnter = (event) => {
    event.preventDefault();
    if (event.key == 'Enter') {
      return this.addTags();
    }
  };

  addTags = () => {
    this.tagsInput = this.tagsInput.trim();
    if (!this.tagsInput) {
      const message = 'Please enter a tag.';
      this.toastr.error(message, undefined, {
        closeButton: true,
        positionClass: 'toast-bottom-center',
      });
      return false;
    }

    this.fetchDataService
    .addTag(this.actionRoute.snapshot.params.file_id, { tag: this.tagsInput })
    .subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.tags = res.file.tags;
        this.tagsInput = '';
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

  removeTags = (tag) => {
    this.fetchDataService
    .removeTag({ file_id: this.actionRoute.snapshot.params.file_id, tag })
    .subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.tags = res.tags;
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

  shareFilesAttachment(value: any) {
    value['file_id'] = this.file_id;
    this.fetchDataService.shareFile(value).subscribe(
      (res:any) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.modalService.dismissAll();
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
