import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path:'', component: WelcomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'user', component:UserComponent},
  {path:'group', component:GroupComponent},
  {path:'creategroup', component:CreategroupComponent},
  {path:'post', component:PostComponent},
  {path:'createpost', component:CreatepostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
