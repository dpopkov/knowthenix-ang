import { Component, Input, OnInit } from '@angular/core';
import { KeyTerm } from 'src/app/model/KeyTerm';

@Component({
  selector: 'app-key-term-edit',
  templateUrl: './key-term-edit.component.html',
  styleUrls: ['./key-term-edit.component.css']
})
export class KeyTermEditComponent implements OnInit {

  @Input()
  keyTerm: KeyTerm;

  constructor() { }

  ngOnInit(): void {
  }

}
