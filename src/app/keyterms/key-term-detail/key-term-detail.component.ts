import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyTerm } from 'src/app/model/KeyTerm';

@Component({
  selector: 'app-key-term-detail',
  templateUrl: './key-term-detail.component.html',
  styleUrls: ['./key-term-detail.component.css']
})
export class KeyTermDetailComponent implements OnInit {

  @Input()
  keyTerm: KeyTerm;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editKeyTerm() {
    this.router.navigate(['keyterms'], {queryParams: {id: this.keyTerm.id, action: 'edit'}});
  }

}
