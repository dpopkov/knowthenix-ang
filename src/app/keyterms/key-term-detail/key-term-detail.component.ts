import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { KeyTerm } from 'src/app/model/KeyTerm';
import {UiComponent} from "../../ui-component";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-key-term-detail',
  templateUrl: './key-term-detail.component.html',
  styleUrls: ['./key-term-detail.component.css']
})
export class KeyTermDetailComponent extends UiComponent implements OnInit {

  @Input()
  keyTerm: KeyTerm;
  @Output()
  dataChangedEvent = new EventEmitter();
  message = '';

  constructor(private router: Router,
              private authService: AuthService,
              private dataService: DataService) {
    super();
  }

  ngOnInit(): void {
    this.setRole(this.authService.getRole());
  }

  editKeyTerm() {
    this.router.navigate(['keyterms'], {queryParams: {id: this.keyTerm.id, action: 'edit'}});
  }

  deleteKeyTerm() {
    const deleteConfirmed = confirm('Are you sure you wish do delete this KeyTerm?');
    if (deleteConfirmed) {
      this.message = "Deleting...";
      this.dataService.deleteKeyTerm(this.keyTerm.id).subscribe(
        next => {
          this.dataChangedEvent.emit();
          this.router.navigate(['keyterms']);
        }, error => {
          this.message = 'Sorry, this KeyTerm cannot be deleted at this time';
        }
      )
    }
  }
}
