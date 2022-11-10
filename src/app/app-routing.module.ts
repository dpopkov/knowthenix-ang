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
import {LoginComponent} from "./login/login.component";
import {AuthRouteGuardService} from "./auth-route-guard.service";
import {AuthUserLoginComponent} from "./ums/auth-user-login/auth-user-login.component";
import {AuthUserRegisterComponent} from "./ums/auth-user-register/auth-user-register.component";
import {AuthUsersComponent} from "./ums/auth-users/auth-users.component";

const routes: Routes = [
  {path : 'questions/questions', component : QuestionsComponent, canActivate: [AuthRouteGuardService]},
  {path : 'questions/edit', component : QuestionEditComponent,
    resolve: {preloaded_categories: PrefetchCategoriesService},
    canActivate: [AuthRouteGuardService]},
  {path : 'questions/view', component: QuestionDetailComponent, canActivate: [AuthRouteGuardService]},
  {path : 'questions/edit/translations', component: TranslationsComponent, canActivate: [AuthRouteGuardService]},
  {path : 'answers/edit', component: AnswerEditComponent,
    resolve: {preloaded_sources: PrefetchSourcesService},
    canActivate: [AuthRouteGuardService]},
  {path : 'answers/edit/translations', component: AnswerTranslationsComponent, canActivate: [AuthRouteGuardService]},
  {path : 'questions/categories', component : CategoriesComponent, canActivate: [AuthRouteGuardService]},
  {path : 'keyterms', component : KeytermsComponent, canActivate: [AuthRouteGuardService]},
  {path : 'keyterms/choose', component : KeyTermChooseComponent,
    resolve: {preloaded_keyterms: PrefetchKeytermsService},
    canActivate: [AuthRouteGuardService]},
  {path : 'sources', component : SourcesComponent, canActivate: [AuthRouteGuardService]},
  {path : 'users', component : AppUsersComponent, canActivate: [AuthRouteGuardService]},
  {path : 'login', component : LoginComponent},

  /* AuthUser Routes */
  {path : 'auth-user-login', component: AuthUserLoginComponent},
  {path : 'auth-user-register', component: AuthUserRegisterComponent},
  {path : 'auth-users/management', component: AuthUsersComponent},
  // {path : '', redirectTo : '/auth-user-login'},

  /* General Routes */
  {path : '', component : HomeComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
