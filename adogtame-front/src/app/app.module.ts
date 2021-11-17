import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { YourpagesComponent } from './layout/yourpages/yourpages.component';
import { NewpagesComponent } from './layout/newpages/newpages.component';
import { UserComponent } from './pages/user/user.component';
import { UsercardComponent } from './layout/usercard/usercard.component';
import { GroupComponent } from './pages/group/group.component';
import { GroupcardComponent } from './layout/groupcard/groupcard.component';
import { CreategroupComponent } from './pages/creategroup/creategroup.component';
import { MinipostComponent } from './layout/minipost/minipost.component';
import { PostcardComponent } from './layout/postcard/postcard.component';
import { CommentComponent } from './layout/comment/comment.component';
import { CreatepostComponent } from './pages/createpost/createpost.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    YourpagesComponent,
    NewpagesComponent,
    UserComponent,
    UsercardComponent,
    GroupComponent,
    GroupcardComponent,
    CreategroupComponent,
    MinipostComponent,
    PostcardComponent,
    CommentComponent,
    CreatepostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
