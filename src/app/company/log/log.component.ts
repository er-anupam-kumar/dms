import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LogService } from 'src/app/services/log/log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  public id: any = this.router.snapshot.params.id;

  constructor(private log: LogService, private router: ActivatedRoute) {}
  rows: any = [];
  temp: any = [];

  @ViewChild(DatatableComponent) userLogTable: DatatableComponent;

  ngOnInit(): void {
    this.getAllUserTable(this.id);
  }

  getAllUserTable(id: any) {
    if (id != null) {
      console.log('id');
      console.log(id);
      this.log.log(id).subscribe((res) => {
        this.rows = res.logs;
        this.temp = [...res.logs];
      });
    } else {
      console.log('hello');
      this.log.logs().subscribe((res) => {
        this.rows = res.logs;
        this.temp = [...res.logs];
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    const temp = this.temp.filter(function (d) {
      return (
        d.user.toLowerCase().indexOf(val) !== -1 ||
        d.event.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.userLogTable.offset = 0;
  }
}
