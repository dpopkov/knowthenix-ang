import {Component, OnInit} from '@angular/core';
import {Language, Question} from "../../../model/Question";
import {Category} from "../../../model/Category";
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Translation} from "../../../model/Translation";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  question: Question;
  categories: Array<Category>;
  languages = Object.keys(Language);
  languageMap: Map<string, string>;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.languageMap = dataService.getLanguageMap();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    const idNumber = +id;
    this.dataService.getQuestionById(idNumber).subscribe(
      next => this.question = next
    )
    this.dataService.getCategories().subscribe(
      next => this.categories = next
    )
  }

  onSubmit(): void {
    this.question.computeLanguageFromDisplayTranslation();
    this.dataService.updateQuestion(this.question).subscribe(
      next => this.router.navigate(['questions', 'questions'])
    );
  }

  selectTranslationByLanguage() {
    const found: Translation = this.question.translations
      .find(tr => tr.language === this.question.selectedLanguage);
    if (found) {
      this.question.displayTranslation = found;
      console.log('found:', found);
    }
  }
}
