import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { KeyTerm } from 'src/app/model/KeyTerm';

@Component({
  selector: 'app-key-term-detail',
  templateUrl: './key-term-detail.component.html',
  styleUrls: ['./key-term-detail.component.css']
})
export class KeyTermDetailComponent implements OnInit {

  @Input()
  keyTerm: KeyTerm;
  @Output()
  dataChangedEvent = new EventEmitter();
  message = '';

  constructor(private router: Router, 
            private dataService: DataService) { }

  ngOnInit(): void {
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
