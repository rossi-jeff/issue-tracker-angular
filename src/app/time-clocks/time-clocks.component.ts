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
  paginated: TimeClockType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private api: ApiService) {}

  loadTimeClocks = () => {
    this.api.get({ path: 'timeclock' }).subscribe((result: any) => {
      this.timeClocks = result;
      this.count = this.timeClocks.length;
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
    this.paginated = this.timeClocks.slice(offset, offset + limit);
  };

  ngOnInit(): void {
    this.loadTimeClocks();
  }
}
