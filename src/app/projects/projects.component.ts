import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { ProjectType } from '../../types/project.type';
import { UserSessionStorage } from '../../lib/user-session';
import {
  ProjectDialogComponent,
  ProjectFormType,
} from '../project-dialog/project-dialog.component';
import { clone } from '../../lib/clone';

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

  session: UserSessionStorage = new UserSessionStorage();

  editor: { [key: string]: ProjectType } = {
    new: { Name: '', Details: '' },
    edit: { Name: '', Details: '' },
  };

  @ViewChild(ProjectDialogComponent) dialog!: ProjectDialogComponent;

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

  newProject = () => {
    this.dialog.showNew();
  };

  editProject = (uuid: string) => {
    const project = this.projects.find((p) => p.UUID == uuid) || {
      Name: '',
      Details: '',
    };
    this.editor['edit'] = clone(project);
    this.dialog.showEdit();
  };

  createProject = (ev: ProjectFormType) => {
    const { Name, Details } = ev;
    this.api
      .post({
        path: 'project',
        body: { Name, Details },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result) => {
        this.projects.push(result);
        this.count = this.projects.length;
        this.setPaginated();
        this.dialog.hideNew();
        this.editor['new'] = { Name: '', Details: '' };
      });
  };

  updateProject = (ev: ProjectFormType) => {
    const { Name, Details, UUID } = ev;
    this.api
      .patch({
        path: `project/${UUID}`,
        body: { Name, Details },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result) => {
        const idx = this.projects.findIndex((p) => p.UUID == UUID);
        if (idx != -1) {
          this.projects[idx] = result;
          this.setPaginated();
        }
        this.dialog.hideEdit();
      });
  };

  ngOnInit(): void {
    this.loadProjects();
  }
}
