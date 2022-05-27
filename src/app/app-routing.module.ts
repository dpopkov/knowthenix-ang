import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KeytermsComponent } from './keyterms/keyterms.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoriesComponent } from './questions/categories/categories.component';
import { QuestionsComponent } from "./questions/questions/questions.component";
import { QuestionEditComponent } from "./questions/questions/question-edit/question-edit.component";

const routes: Routes = [
  {path : 'questions/questions', component : QuestionsComponent},
  {path : 'questions/edit', component : QuestionEditComponent},
  {path : 'questions/categories', component : CategoriesComponent},
  {path : 'keyterms', component : KeytermsComponent},
  {path : '', component : HomeComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
