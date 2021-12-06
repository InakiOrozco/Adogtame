import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { GroupComponent } from './pages/group/group.component';
import { PostComponent } from './pages/post/post.component';
import { UserComponent } from './pages/user/user.component';
import { LoggedGuard } from './common/guards/logged.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { ForvidenComponent } from './pages/forviden/forviden.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent, canActivate: [LoggedGuard]},
  {path:'login', component: LoginComponent, canActivate: [LoggedGuard]},
  {path:'register', component: RegisterComponent, canActivate: [LoggedGuard]},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'group/:id', component: GroupComponent, canActivate: [AuthGuard]},
  {path:'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path:'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path:'**', component: ForvidenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
