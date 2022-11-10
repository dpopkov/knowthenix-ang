import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './questions/categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryDetailComponent } from './questions/categories/category-detail/category-detail.component';
import { CategoryEditComponent } from './questions/categories/category-edit/category-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeytermsComponent } from './keyterms/keyterms.component';
import { KeyTermDetailComponent } from './keyterms/key-term-detail/key-term-detail.component';
import { KeyTermEditComponent } from './keyterms/key-term-edit/key-term-edit.component';
import { QuestionsComponent } from './questions/questions/questions.component';
import { QuestionEditComponent } from './questions/questions/question-edit/question-edit.component';
import { TranslationsComponent } from './questions/questions/translations/translations.component';
import { TranslationEditComponent } from './questions/questions/translations/translation-edit/translation-edit.component';
import { SourcesComponent } from './sources/sources.component';
import { SourceDetailComponent } from './sources/source-detail/source-detail.component';
import { SourceEditComponent } from './sources/source-edit/source-edit.component';
import { QuestionDetailComponent } from './questions/questions/question-detail/question-detail.component';
import { AnswersComponent } from './questions/answers/answers.component';
import { AnswerEditComponent } from './questions/answers/answer-edit/answer-edit.component';
import { AnswerTranslationsComponent } from './questions/answers/answer-translations/answer-translations.component';
import { AnswerTranslationEditComponent } from './questions/answers/answer-translations/answer-translation-edit/answer-translation-edit.component';
import { KeyTermChooseComponent } from './keyterms/key-term-choose/key-term-choose.component';
import { AppUsersComponent } from './users/app-users/app-users.component';
import { AppUserDetailComponent } from './users/app-users/app-user-detail/app-user-detail.component';
import { AppUserEditComponent } from './users/app-users/app-user-edit/app-user-edit.component';
import { RecentsComponent } from './recents/recents.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./authentication.service";
import { AuthUserService } from "./auth-user.service";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { NotificationModule } from "./notification.module";
import { NotificationService } from "./notification.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    KeytermsComponent,
    KeyTermDetailComponent,
    KeyTermEditComponent,
    KeyTermChooseComponent,
    QuestionsComponent,
    QuestionDetailComponent,
    QuestionEditComponent,
    TranslationsComponent,
    TranslationEditComponent,
    SourcesComponent,
    SourceDetailComponent,
    SourceEditComponent,
    AnswersComponent,
    AnswerEditComponent,
    AnswerTranslationsComponent,
    AnswerTranslationEditComponent,
    AppUsersComponent,
    AppUserDetailComponent,
    AppUserEditComponent,
    RecentsComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AuthUserService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
