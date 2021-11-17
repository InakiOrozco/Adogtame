import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LoggedGuard } from './common/guards/logged.guard';
import { CreategroupComponent } from './pages/creategroup/creategroup.component';
import { CreatepostComponent } from './pages/createpost/createpost.component';
import { GroupComponent } from './pages/group/group.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent,canActivate: [LoggedGuard]},
  {path:'login', component: LoginComponent,canActivate: [LoggedGuard]},
  {path:'register', component: RegisterComponent,canActivate: [LoggedGuard]},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'user', component:UserComponent, canActivate: [AuthGuard]},
  {path:'group', component:GroupComponent, canActivate: [AuthGuard]},
  {path:'creategroup', component:CreategroupComponent, canActivate: [AuthGuard]},
  {path:'post', component:PostComponent, canActivate: [AuthGuard]},
  {path:'createpost', component:CreatepostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
