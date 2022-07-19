import {Component, OnInit} from '@angular/core';
import {Question} from "../../../model/Question";
import {Language} from "../../../model/Language";
import {Category} from "../../../model/Category";
import {DataService} from "../../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Translation} from "../../../model/Translation";
import {map} from "rxjs";

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  question: Question;
  firstTranslation: Translation
  firstTranslationFilled = true;
  action: string;
  categories: Array<Category>;
  languages = Object.keys(Language);
  languageMap: Map<string, string>;
  dataLoaded = false;
  message = 'Please wait...';

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.languageMap = dataService.getLanguageMap();
  }

  ngOnInit(): void {
    this.categories = this.route.snapshot.data['preloaded_categories'];
    this.action = this.route.snapshot.queryParams['action'];
    const idAsString = this.route.snapshot.queryParams['id'];
    if (idAsString) {
      const idNumber = +idAsString;
      this.dataService.getQuestionById(idNumber)
        .pipe(
          map(question => {
            question.category = this.categories.find(c => c.id === question.category.id);
            return question;
          })
        )
        .subscribe(
        next => {
          this.question = next;
          this.dataLoaded = true;
          this.message = '';
        }
      )
    } else {  // for creating a new Question
      this.question = new Question();
      this.dataLoaded = true;
      this.message = '';
      this.firstTranslation = new Translation();
      this.firstTranslationFilled = false;
      this.question.translations.push(this.firstTranslation)
    }
  }

  onSubmit(): void {
    this.question.computeLanguageFromDisplayTranslation();
    if (this.question.isNew()) {
      this.dataService.addNewQuestion(this.question).subscribe(
        next => this.navigateToQuestionList()
      );
    } else {
      this.dataService.updateQuestion(this.question).subscribe(
        next => this.navigateToQuestionList()
      );
    }
  }

  selectTranslationByLanguage() {
    const found: Translation = this.question.translations
      .find(tr => tr.language === this.question.selectedLanguage);
    if (found) {
      this.question.displayTranslation = found;
    }
  }

  navigateToTranslations(): void {
    this.router.navigate(['questions', 'edit', 'translations'],
      {queryParams: {questionId: this.question.id}} );
  }

  closeQuestionEdit(): void {
    this.navigateToQuestionList();
  }

  hideFirstTranslationForm(): void {
    this.question.displayTranslation = this.question.translations[0];
    this.question.selectedLanguage = this.question.displayTranslation.language;
    this.firstTranslationFilled = true;
  }

  private navigateToQuestionList(): void{
    this.router.navigate(['questions', 'questions'])
  }

  navigateToKeyTermsChoosing() {
    this.router.navigate(['keyterms', 'choose'],
      {queryParams: {target: 'question', id: this.question.id}});
  }
}
