import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TimeClockType } from '../../types/time-clock.type';

@Component({
  selector: 'app-time-clocks',
  templateUrl: './time-clocks.component.html',
  styleUrls: ['./time-clocks.component.css'],
})
export class TimeClocksComponent implements OnInit {
  timeClocks: TimeClockType[] = [];

  constructor(private api: ApiService) {}

  loadTimeClocks = () => {
    this.api.get({ path: 'timeclock' }).subscribe((result: any) => {
      this.timeClocks = result;
    });
  };

  ngOnInit(): void {
    this.loadTimeClocks();
  }
}
