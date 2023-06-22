import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../types/project.type';
import { UserSessionStorage } from '../../lib/user-session';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project!: ProjectType;
  @Output() editProject = new EventEmitter<string>();

  session: UserSessionStorage = new UserSessionStorage();

  editProjectClicked = () => {
    const { UUID } = this.project;
    this.editProject.emit(UUID);
  };
}
