import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateSelectionService {
  timezoneOffset = new Date().getTimezoneOffset() * 60000;

  selectedDate = new Date(Date.now() - this.timezoneOffset);
  todaysDate = new Date(Date.now() - this.timezoneOffset);

  constructor() {}

  get selectedDateAsString() {
    return this.selectedDate.toJSON().substring(0, 10);
  }

  get todaysDateAsString() {
    return this.todaysDate.toJSON().substring(0, 10);
  }

  get isTheSelectedDateTodaysDate() {
    return this.selectedDateAsString === this.todaysDateAsString;
  }

  addDays(numberOfDays: number) {
    const dayInMillis = 1000 * 60 * 60 * 24;
    this.selectedDate = new Date(
      this.selectedDate.getTime() + dayInMillis * numberOfDays
    );
    this.todaysDate = new Date(Date.now() - this.timezoneOffset);
  }
}
