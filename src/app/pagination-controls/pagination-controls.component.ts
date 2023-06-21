import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.css'],
})
export class PaginationControlsComponent {
  private _limit!: number;
  private _offset!: number;
  private _count!: number;

  @Input()
  set count(value: number) {
    this._count = value;
    this.setCurrent();
    this.buildPages();
  }
  get count() {
    return this._count;
  }

  @Input()
  set limit(value: number) {
    this._limit = value;
    this.setCurrent();
    this.buildPages();
  }
  get limit() {
    return this._limit;
  }

  @Input()
  set offset(value: number) {
    this._offset = value;
    this.setCurrent();
  }
  get offset() {
    return this._offset;
  }

  @Output() pageChanged = new EventEmitter<number>();
  @Output() limitChanged = new EventEmitter<number>();

  pages: number[] = [];
  first: number = 0;
  last: number = 0;
  current: number = 1;
  perPage: number = 10;
  perPageOptions: number[] = [5, 10, 25];

  buildPages = () => {
    if (typeof this.count == 'number' && typeof this.limit == 'number') {
      const { count, limit } = this;
      this.pages = [];
      let page = 1;
      let counter = 0;
      while (counter < count) {
        this.pages.push(page);
        page++;
        counter += limit;
      }
    }
  };

  setCurrent = () => {
    if (
      typeof this.offset == 'number' &&
      typeof this.limit == 'number' &&
      typeof this.count == 'number'
    ) {
      const { offset, limit, count } = this;
      this.current = Math.floor(offset / limit) + 1;
      this.first = (this.current - 1) * limit + 1;
      this.last = Math.min((this.current - 1) * limit + limit, count);
      this.perPage = limit;
    }
  };

  pageSelectChanged = (ev: any) => {
    this.current = this.pages[ev.target.selectedIndex];
    this.pageChanged.emit(this.current);
  };

  limitSelectChanged = (ev: any) => {
    this.perPage = this.perPageOptions[ev.target.selectedIndex];
    this.limitChanged.emit(this.perPage);
  };

  firstPage = () => {
    this.current = 1;
    this.pageChanged.emit(1);
  };

  previousPage = () => {
    if (this.current < 2) return;
    this.current--;
    this.pageChanged.emit(this.current);
  };

  nextPage = () => {
    const final = this.pages[this.pages.length - 1];
    if (this.current + 1 > final) return;
    this.current++;
    this.pageChanged.emit(this.current);
  };

  lastPage = () => {
    this.current = this.pages[this.pages.length - 1];
    this.pageChanged.emit(this.current);
  };
}
