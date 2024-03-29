import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssuesComponent } from './issues/issues.component';
import { ProjectsComponent } from './projects/projects.component';
import { TimeClocksComponent } from './time-clocks/time-clocks.component';
import { UsersComponent } from './users/users.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'time_clocks', component: TimeClocksComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UserNewComponent },
  { path: 'users/:uuid', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
