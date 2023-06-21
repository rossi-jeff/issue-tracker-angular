import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ProjectType } from '../../types/project.type';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectType[] = [];
  paginated: ProjectType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private api: ApiService) {}

  loadProjects = () => {
    this.api.get({ path: 'project' }).subscribe((result: any) => {
      this.projects = result;
      this.count = this.projects.length;
      this.setPaginated();
    });
  };

  pageChanged = (page: number) => {
    this.offset = (page - 1) * this.limit;
    this.setPaginated();
  };

  limitChanged = (perPage: number) => {
    this.limit = perPage;
    this.offset = 0;
    this.setPaginated();
  };

  setPaginated = () => {
    const { offset, limit } = this;
    this.paginated = this.projects.slice(offset, offset + limit);
  };

  ngOnInit(): void {
    this.loadProjects();
  }
}
