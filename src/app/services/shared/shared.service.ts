import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private dataSource = new BehaviorSubject(this.editDataDetails);
  currentData = this.dataSource.asObservable();
  changeData(data: any) {
    this.dataSource.next(data)
  }
}
