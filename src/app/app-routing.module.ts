import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register.component";
import {AchievementsComponent} from "./home/achievements/achievements.component";
import {ProjectsComponent} from "./home/projects/projects.component";
import {ProjectsNewComponent} from "./home/projects/projects-new.component";
import {ProjectsDetailComponent} from "./home/projects/projects-detail.component";
import {UserComponent} from "./home/user/user.component";
import {UserEditNameComponent} from "./home/user/user-edit-name.component";
import {UserEditMailComponent} from "./home/user/user-edit-mail.component";

const routes: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'user/name', component: UserEditNameComponent, canActivate: [AuthGuardService]},
  {path: 'user/mail', component: UserEditMailComponent, canActivate: [AuthGuardService]},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuardService]},
  {path: 'projects/new', component: ProjectsNewComponent, canActivate: [AuthGuardService]},
  {path: 'projects/:id', component: ProjectsDetailComponent, canActivate: [AuthGuardService]},
  {path: 'achievements', component: AchievementsComponent, canActivate: [AuthGuardService]},
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
