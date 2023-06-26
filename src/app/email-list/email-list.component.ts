import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmailType } from '../../types/email.type';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css'],
})
export class EmailListComponent {
  @Input() emails!: EmailType[];
  @Output() editEmail = new EventEmitter<string>();
  @Output() deleteEmail = new EventEmitter<string>();
}
