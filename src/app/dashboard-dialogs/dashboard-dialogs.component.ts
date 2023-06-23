import { Component, EventEmitter, Output } from '@angular/core';
import { OtherStatusArray } from '../../types/array.types';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard-dialogs',
  templateUrl: './dashboard-dialogs.component.html',
  styleUrls: ['./dashboard-dialogs.component.css'],
})
export class DashboardDialogsComponent {
  @Output() setStatus = new EventEmitter<string>();

  statuses = OtherStatusArray;

  statusForm = new FormGroup({
    Status: new FormControl(''),
  });

  showOverlay = () => {
    const overlay = document.getElementById('dashboard-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('dashboard-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showOther = () => {
    this.showOverlay();
    const dialog = document.getElementById('other-status-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideOther = () => {
    const dialog = document.getElementById('other-status-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  setStatusClicked = () => {
    const { Status } = this.statusForm.value;
    if (!Status) return;
    this.setStatus.emit(Status);
  };
}
