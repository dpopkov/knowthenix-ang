import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { KeyTerm } from '../model/KeyTerm';

@Component({
  selector: 'app-keyterms',
  templateUrl: './keyterms.component.html',
  styleUrls: ['./keyterms.component.css']
})
export class KeytermsComponent implements OnInit {

  keyterms: Array<KeyTerm>;
  selectedKeyTerm: KeyTerm;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getKeyTerms().subscribe(
      (next) => {
        this.keyterms = next;
      }
    )
    this.route.queryParams.subscribe(
      (params) => {
        const idAsString = params['id'];
        if (idAsString) {
          const idAsNumber = +idAsString;
          this.selectedKeyTerm = this.keyterms.find(keyTerm => keyTerm.id === idAsNumber);
        }
        this.action = params['action'];
        if (this.action === 'add') {
          this.selectedKeyTerm = new KeyTerm();
          this.action = 'edit';
        }
      }
    )
  }

  setSelectedKeyTerm(keyTermId: number): void {
    this.router.navigate(['keyterms'], {queryParams: {id: keyTermId, action: 'view'}});
  }

  addKeyTerm(): void {
    this.router.navigate(['keyterms'], {queryParams: {action: 'add'}});
  }
}