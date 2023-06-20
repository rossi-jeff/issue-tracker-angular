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

  constructor(private api: ApiService) {}

  loadProjects = () => {
    this.api.get({ path: 'project' }).subscribe((result: any) => {
      this.projects = result;
      console.log(result);
    });
  };

  ngOnInit(): void {
    this.loadProjects();
  }
}
