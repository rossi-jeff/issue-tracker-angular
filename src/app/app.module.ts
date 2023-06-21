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

@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent, ProjectsComponent, IssuesComponent, TimeClocksComponent, UsersComponent, ProjectCardComponent, PaginationControlsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
