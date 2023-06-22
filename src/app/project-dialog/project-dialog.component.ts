import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../types/project.type';
import { FormControl, FormGroup } from '@angular/forms';

export type ProjectFormType = {
  Name?: string | null;
  Details?: string | null;
  UUID?: string | null;
};

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})
export class ProjectDialogComponent {
  private _newProject!: ProjectType;
  private _editProject!: ProjectType;

  @Input()
  set newProject(value: ProjectType) {
    this._newProject = value;
    this.newProjectForm.patchValue({
      Name: value.Name || '',
      Details: value.Details || '',
    });
  }
  get newProject() {
    return this._newProject;
  }

  @Input()
  set editProject(value: ProjectType) {
    this._editProject = value;
    this.editProjectForm.patchValue({
      Name: value.Name || '',
      Details: value.Details || '',
      UUID: value.UUID || '',
    });
  }
  get editproject() {
    return this._editProject;
  }

  @Output() createProject = new EventEmitter<ProjectFormType>();
  @Output() updateProject = new EventEmitter<ProjectFormType>();

  newProjectForm = new FormGroup({
    Name: new FormControl(''),
    Details: new FormControl(''),
    UUID: new FormControl(''),
  });

  editProjectForm = new FormGroup({
    Name: new FormControl(''),
    Details: new FormControl(''),
    UUID: new FormControl(''),
  });

  showOverlay = () => {
    const overlay = document.getElementById('project-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('project-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showNew = () => {
    this.hideEdit();
    this.showOverlay();
    const dialog = document.getElementById('new-project-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideNew = () => {
    const dialog = document.getElementById('new-project-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showEdit = () => {
    this.hideNew();
    this.showOverlay();
    const dialog = document.getElementById('edit-project-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideEdit = () => {
    const dialog = document.getElementById('edit-project-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  createProjectClicked = () =>
    this.createProject.emit(this.newProjectForm.value);

  updateProjectClicked = () =>
    this.updateProject.emit(this.editProjectForm.value);
}
