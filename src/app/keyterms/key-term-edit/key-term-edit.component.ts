import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KeyTerm } from 'src/app/model/KeyTerm';

@Component({
  selector: 'app-key-term-edit',
  templateUrl: './key-term-edit.component.html',
  styleUrls: ['./key-term-edit.component.css']
})
export class KeyTermEditComponent implements OnInit {

  @Input()
  keyTerm: KeyTerm;
  keyTermForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.keyTermForm = this.formBuilder.group(
      {
        keyTermName: this.keyTerm.name,
        keyTermDescription: this.keyTerm.description
      }
    );
  }

  onSubmit() {
    this.keyTerm.name = this.keyTermForm.controls['keyTermName'].value;
    this.keyTerm.description = this.keyTermForm.controls['keyTermDescription'].value;
    console.log('updated keyterm', this.keyTerm);
  }

}
