import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { GoogleButtonComponent } from './layout/google-button/google-button.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateGroupDialog, YourPagesComponent } from './layout/your-pages/your-pages.component';
import { NewPagesComponent } from './layout/new-pages/new-pages.component';
import { MiniPostComponent } from './layout/mini-post/mini-post.component';
import { CreatePostDialog, GroupComponent  } from './pages/group/group.component';
import { PostComponent } from './pages/post/post.component';
import { UserComponent } from './pages/user/user.component';
import { CommentComponent } from './layout/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    GoogleButtonComponent,
    HomeComponent,
    YourPagesComponent,
    NewPagesComponent,
    MiniPostComponent,
    GroupComponent,
    CreatePostDialog,
    PostComponent,
    UserComponent,
    CommentComponent,
    CreateGroupDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
