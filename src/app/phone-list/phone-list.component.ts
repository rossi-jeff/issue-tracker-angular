import { Component, Input } from '@angular/core';
import { PhoneType } from '../../types/phone.type';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css'],
})
export class PhoneListComponent {
  @Input() phones!: PhoneType[];
}
