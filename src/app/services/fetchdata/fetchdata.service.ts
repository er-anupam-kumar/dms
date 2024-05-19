import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

export interface IAddFolder {
  name: string;
  description: string;
  parent_id: string;
}
export interface IUpdateFolder {
  name: string;
  parent_id: number;
  description: string;
}
export interface IrenameFile {
  name: string;
  comment: string;
}

export interface IComment {
  file_id: number;
  comment: string;
}

export interface IUploadFile {
  file: File;
  comment: string;
  folder_id: string;
}

export interface IGetFolders {
  parent_id: string;
}

export interface IGetFavourite {
  favourite: string;
}

export interface IshareFiles {
  file_id: string;
  to: string;
  body: string;
}

export interface Iapproval {
  user_id: number;
  comment: string;
}

export interface IUpdateApproval {
  status: string;
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class FetchdataService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  getFolders(data: IGetFolders): Observable<any> {
    if (data.parent_id) {
      return this.http.get(
        `${environment.apiUrl}/company/folders/${data.parent_id}`
      );
    } else {
      return this.http.get(`${environment.apiUrl}/company/folders`);
    }
  }

  addFolder(data: IAddFolder): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/folders`, data);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/files`);
  }

  getFavouriteFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/files?favourite=1`);
  }

  getApprovalFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/files?approval_status=0`);
  }

  postApproval(approval: Iapproval): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/file-approval`,approval);
  }

  getSearchFiles(data): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/files?search=` + data);
  }

  uploadFile(folder_id: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${environment.apiUrl}/company/files`, formData);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  updateFolder(id, folder: IUpdateFolder): Observable<any> {
    return this.http.put(`${environment.apiUrl}/company/folders/${id}`, folder);
  }
  getFileById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/files/${id}`);
  }

  postComment(comment: IComment): Observable<any> {
    return this.http.post(`${environment.apiUrl}/company/comments`, comment);
  }

  addTag(id, data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/company/files/${id}`, data);
  }

  removeTag(data): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/company/file/remove-tag`,
      data
    );
  }

  updateFile(id, data) {
    this.http.put(`${environment.apiUrl}/company/files/${id}`, data).subscribe(
      (res: any) => {
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

  deleteFileOrFolder(id, type) {
    Swal.fire({
      title: 'Are you sure want to delete this ' + type + ' ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`${environment.apiUrl}/company/${type}s/${id}`)
          .subscribe(
            (res: any) => {
              this.toastr.success(res.message, undefined, {
                closeButton: true,
                positionClass: 'toast-bottom-center',
              });
              this.refreshAll();
            },
            (err) => {
              this.toastr.error(err.error.message, undefined, {
                closeButton: true,
                positionClass: 'toast-bottom-center',
              });
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your ' + type + ' is safe :)', 'error');
      }
    });
  }

  refreshAll() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  shareFile(fileData: IshareFiles) {
    return this.http.post(`${environment.apiUrl}/company/file/share`, fileData);
  }

  updateApproval(id, approval: IUpdateApproval): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/company/file-approval/${id}`,
      approval
    );
  }
}
