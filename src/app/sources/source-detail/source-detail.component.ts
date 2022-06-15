import {Component, Input, OnInit} from '@angular/core';
import {Source} from "../../model/Source";
import {Router} from "@angular/router";

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  styleUrls: ['./source-detail.component.css']
})
export class SourceDetailComponent implements OnInit {

  @Input()
  source: Source;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editSource(): void {
    this.router.navigate(['sources'], {queryParams: {id: this.source.id, action: 'edit'}})
  }

}
