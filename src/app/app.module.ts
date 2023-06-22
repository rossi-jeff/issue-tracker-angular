import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { IssuesComponent } from './issues/issues.component';
import { TimeClocksComponent } from './time-clocks/time-clocks.component';
import { UsersComponent } from './users/users.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { PaginationControlsComponent } from './pagination-controls/pagination-controls.component';
import { IssueCardComponent } from './issue-card/issue-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { TimeClockCardComponent } from './time-clock-card/time-clock-card.component';
import { IssueFilterComponent } from './issue-filter/issue-filter.component';
import { TimeClockFilterComponent } from './time-clock-filter/time-clock-filter.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ProjectsComponent,
    IssuesComponent,
    TimeClocksComponent,
    UsersComponent,
    ProjectCardComponent,
    PaginationControlsComponent,
    IssueCardComponent,
    UserCardComponent,
    TimeClockCardComponent,
    IssueFilterComponent,
    TimeClockFilterComponent,
    DashboardCardComponent,
    SignInDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
