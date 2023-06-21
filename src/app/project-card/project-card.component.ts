import { Component, Input } from '@angular/core';
import { ProjectType } from '../../types/project.type';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project!: ProjectType;
}
