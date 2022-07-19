import { Component, OnInit } from '@angular/core';
import {KeyTerm} from "../../model/KeyTerm";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-key-term-choose',
  templateUrl: './key-term-choose.component.html',
  styleUrls: ['./key-term-choose.component.css']
})
export class KeyTermChooseComponent implements OnInit {

  targetType: string;
  targetId: number;
  allKeyTerms: Array<KeyTerm>;
  dataLoaded = false;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.allKeyTerms = this.route.snapshot.data['preloaded_keyterms'];
    this.targetType = this.route.snapshot.queryParams['target'];
    const targetIdStr = this.route.snapshot.queryParams['id'];
    if (targetIdStr) {
      this.targetId = +targetIdStr;
    }
    if (this.targetType === 'question') {
      this.dataService.getKeyTermsByQuestionId(this.targetId).subscribe(
        next => {
          this.checkKeyterms(next);
          this.dataLoaded = true;
        }
      )
    }
  }

  private checkKeyterms(selected: Array<KeyTerm>): void {
    this.allKeyTerms.forEach(kt => {
      if (selected.find(k => k.id === kt.id)) {
        kt.checked = true;
      }
    })
  }

  onSubmit(): void {
    // analyze selectedKeyTermIds and calculate arrays of IDs to add/remove
    console.log('KeyTermChooseComponent:onSubmit IS NOT IMPLEMENTED YET');
  }

  navigateBackToEditPage(): void {
    console.log('KeyTermChooseComponent:navigateBackToEditPage IS UNDER CONSTRUCTION');
    if (this.targetType === 'question') {
      this.router.navigate(['questions', 'edit'], {queryParams: {id: this.targetId}});
    } else {
      console.log('KeyTermChooseComponent:navigateBackToEditPage: CANNOT PROCESS targetType=', this.targetType);
    }
  }

}
