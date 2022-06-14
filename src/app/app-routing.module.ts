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

const routes: Routes = [
  {path : 'questions/questions', component : QuestionsComponent},
  {path : 'questions/edit', component : QuestionEditComponent, resolve: {preloaded_categories: PrefetchCategoriesService}},
  {path : 'questions/edit/translations', component: TranslationsComponent},
  {path : 'questions/categories', component : CategoriesComponent},
  {path : 'keyterms', component : KeytermsComponent},
  {path : 'sources', component : SourcesComponent},
  {path : '', component : HomeComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
