import { Component, OnInit } from '@angular/core';
import {KeyTerm} from "../../model/KeyTerm";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../data.service";
import {IdChangeSet} from "../../model/IdChangeSet";

@Component({
  selector: 'app-key-term-choose',
  templateUrl: './key-term-choose.component.html',
  styleUrls: ['./key-term-choose.component.css']
})
export class KeyTermChooseComponent implements OnInit {

  targetType: string;
  targetId: number;
  allKeyTerms: Array<KeyTerm>;
  targetKeyTerms: Array<KeyTerm>;
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
          this.targetKeyTerms = next;
          this.dataLoaded = true;
        }
      )
    } else if (this.targetType === 'answer') {
      this.dataService.getKeyTermsByAnswerId(this.targetId).subscribe(
        next => {
          this.checkKeyterms(next);
          this.targetKeyTerms = next;
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
    const idChangeSet = new IdChangeSet();
    this.allKeyTerms.forEach(kt => {
      const contains = this.questionKeytermsContainId(kt.id);
      if (kt.checked && !contains) {
        idChangeSet.addIdToAdd(kt.id);
      } else if (!kt.checked && contains) {
        idChangeSet.addIdToRemove(kt.id);
      }
    });
    if (this.targetType === 'question') {
      this.dataService.patchKeyTermsByQuestionId(this.targetId, idChangeSet).subscribe(
        next => {
          this.displayEditQuestion(this.targetId);
        }
      )
    }
    else if (this.targetType === 'answer') {
      this.dataService.patchKeyTermsByAnswerId(this.targetId, idChangeSet).subscribe(
        next => {
          this.displayEditAnswer(this.targetId);
        }
      )
    }
  }

  displayEditQuestion(questionId: number): void {
    this.router.navigate(['questions', 'edit'], {queryParams: {id: questionId}});
  }

  displayEditAnswer(answerId: number): void {
    this.router.navigate(['answers', 'edit'], {queryParams: {answerId: answerId}});
  }

  private questionKeytermsContainId(id: number) {
    const found = this.targetKeyTerms.find(kt => kt.id === id);
    return found != null;
  }

  navigateBackToEditPage(): void {
    if (this.targetType === 'question') {
      this.router.navigate(['questions', 'edit'], {queryParams: {id: this.targetId}});
    } else {
      this.router.navigate(['answers', 'edit'], {queryParams: {answerId: this.targetId}});
    }
  }

}
