import {Component, Input, OnInit} from '@angular/core';
import {Source} from "../../model/Source";

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.css']
})
export class SourceDetailComponent implements OnInit {

  @Input()
  source: Source;

  constructor() { }

  ngOnInit(): void {
  }

}
