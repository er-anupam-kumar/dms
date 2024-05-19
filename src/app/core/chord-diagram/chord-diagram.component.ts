import { Component, OnInit, NgZone } from '@angular/core';




@Component({
  selector: 'app-chord-diagram',
  templateUrl: './chord-diagram.component.html',
  styleUrls: ['./chord-diagram.component.scss']
})
export class ChordDiagramComponent implements OnInit {

  constructor(private zone: NgZone) { }

 

  ngOnInit(): void {
  }

}
