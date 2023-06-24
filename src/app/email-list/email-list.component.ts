import { Component, Input } from '@angular/core';
import { EmailType } from '../../types/email.type';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css'],
})
export class EmailListComponent {
  @Input() emails!: EmailType[];
}
