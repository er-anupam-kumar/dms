import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FetchdataService } from 'src/app/services/fetchdata/fetchdata.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
})
export class FoldersComponent implements OnInit {
  public results: string = 'Allfile';
  public folders: Array<any> = [];
  public files: Array<any> = [];
  public filesPerPage: number = 40;
  public filesBuffer: Array<any> = [];
  public infolder: Boolean = false;
  public infile: Boolean = false;
  public currentFolder: string = '';
  public currentFile: string = '';
  public renameId: number;
  public directory: any = []

  constructor(
    private cdr: ChangeDetectorRef,
    private fetchDataService: FetchdataService,
    private sharedDataService: SharedService,
    private modalService: NgbModal,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentFolder = this.getCurrentFolderId();
    this.fetchResults(this.currentFolder);
  }

  paginateFiles() {
    let pageData = this.filesBuffer.slice(this.files.length, (this.files.length + this.filesPerPage))
    this.files = this.files.concat(pageData)
  }

  getCurrentFolderId() {
    let id = '';
    if (this.activeRouter.snapshot.params.folder_id) {
      id = this.activeRouter.snapshot.params.folder_id.toString();
      this.infolder = true;
    }
    return id;
  }

  fetchResults(parent_id: string) {
    this.fetchDataService.getFolders({ parent_id }).subscribe((data: any) => {
      this.directory = data.folder?.directory;

      if (data.folder) {
        this.sharedDataService.changeData({
          modify: data.folder.modify,
          view: data.folder.modify
        });
      }

      if (data.folders) {
        this.folders = data.folders;
      } else if (data.subfolders) {
        this.folders = data.subfolders;
      } else {
        this.folders = [];
      }

      if (data.files) {
        this.filesBuffer = data.files;
        this.paginateFiles()
      } else {
        this.filesBuffer = [];
      }
    });
  }

  openFolder = (folder_id) => {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/company/documents/folders/' + folder_id);
  };

  openFile = (file_id) => {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('/company/documents/files/' + file_id);
  }

  openModal(id, type, renameId) {
    this.renameId = renameId;
    this.modalService.open(id, { size: type });
  }

  deleteFileOrFolder(id, type) {
    return this.fetchDataService.deleteFileOrFolder(id, type);
  }

  renameFiles(data: any) {
    return this.fetchDataService.updateFile(this.renameId, data);
  }

  renameFolders(data: any) {
    this.fetchDataService.updateFolder(this.renameId, data).subscribe(
      (res) => {
        this.toastr.success(res.message, undefined, {
          closeButton: true,
          positionClass: 'toast-bottom-center',
        });
        this.modalService.dismissAll();
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

  favoriteAction(id, type) {
    let favoriteData = { favourite: type };
    this.fetchDataService.updateFile(id, favoriteData);
  }

  downLoadFile(file_id) {
    window.open(environment.apiUrl + '/download-file/' + file_id, '_parent');
  }

  openMenu(e, id, type) {
    // e.preventDefault();
    // let div = <HTMLInputElement>document.getElementById('customContext');
    // div.style.display = 'block';
    // div.style.position = 'absolute';
    // div.style.top = e.pageY + 'px';
    // div.style.left = e.pageX + 'px';
  }
}
