import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeClockType } from '../../types/time-clock.type';
import { getFullName } from '../../lib/get-full-name';
import { getTimeClockHours } from '../../lib/get-time-clock-hours';
import { formatClock } from '../../lib/format-clock';
import { UserSessionStorage } from '../../lib/user-session';

@Component({
  selector: 'app-time-clock-card',
  templateUrl: './time-clock-card.component.html',
  styleUrls: ['./time-clock-card.component.css'],
})
export class TimeClockCardComponent implements OnInit {
  @Input() timeClock!: TimeClockType;
  @Output() editTimeClock = new EventEmitter<string>();

  session: UserSessionStorage = new UserSessionStorage();

  user: string = '';
  project: string = '';
  issue: string = '';
  from: string = '';
  to: string = '';
  hours: string = '';

  editTimeclockClicked = () => {
    const { UUID } = this.timeClock;
    this.editTimeClock.emit(UUID);
  };

  ngOnInit(): void {
    const { timeClock } = this;
    this.user = timeClock.User ? getFullName(timeClock.User) : 'N/A';
    this.project =
      timeClock.Project && timeClock.Project.Name
        ? timeClock.Project.Name
        : 'N/A';
    this.issue =
      timeClock.Issue && timeClock.Issue.SequenceNumber
        ? timeClock.Issue.SequenceNumber
        : 'N/A';
    this.hours = getTimeClockHours(timeClock);
    this.from =
      timeClock.Start && timeClock.Start.Date && timeClock.Start.Time
        ? formatClock(timeClock.Start)
        : 'N/A';
    this.to =
      timeClock.End && timeClock.End.Date && timeClock.End.Time
        ? formatClock(timeClock.End)
        : 'N/A';
  }
}
