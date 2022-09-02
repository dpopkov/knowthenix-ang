import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KeytermsComponent } from './keyterms/keyterms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoriesComponent } from './questions/categories/categories.component';
import { QuestionsComponent } from "./questions/questions/questions.component";
import { QuestionEditComponent } from "./questions/questions/question-edit/question-edit.component";
import { PrefetchCategoriesService } from "./prefetch-categories.service";
import {TranslationsComponent} from "./questions/questions/translations/translations.component";
import {SourcesComponent} from "./sources/sources.component";
import {QuestionDetailComponent} from "./questions/questions/question-detail/question-detail.component";
import {AnswerEditComponent} from "./questions/answers/answer-edit/answer-edit.component";
import {PrefetchSourcesService} from "./prefetch-sources.service";
import {AnswerTranslationsComponent} from "./questions/answers/answer-translations/answer-translations.component";
import {KeyTermChooseComponent} from "./keyterms/key-term-choose/key-term-choose.component";
import {PrefetchKeytermsService} from "./prefetch-keyterms.service";
import {AppUsersComponent} from "./users/app-users/app-users.component";

const routes: Routes = [
  {path : 'questions/questions', component : QuestionsComponent},
  {path : 'questions/edit', component : QuestionEditComponent, resolve: {preloaded_categories: PrefetchCategoriesService}},
  {path : 'questions/view', component: QuestionDetailComponent},
  {path : 'questions/edit/translations', component: TranslationsComponent},
  {path : 'answers/edit', component: AnswerEditComponent, resolve: {preloaded_sources: PrefetchSourcesService}},
  {path : 'answers/edit/translations', component: AnswerTranslationsComponent},
  {path : 'questions/categories', component : CategoriesComponent},
  {path : 'keyterms', component : KeytermsComponent},
  {path : 'keyterms/choose', component : KeyTermChooseComponent, resolve: {preloaded_keyterms: PrefetchKeytermsService}},
  {path : 'sources', component : SourcesComponent},
  {path : 'users', component : AppUsersComponent},
  {path : '', component : HomeComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
