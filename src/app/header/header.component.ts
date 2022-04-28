import { Component, HostBinding, OnInit } from '@angular/core';
import { DateSelectionService } from '../services/date-selection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.dateSelectionService.isTheSelectedDateTodaysDate
      ? this.highlightColor
      : this.defaultColor;
  }

  highlightColor = 'rgb(56, 127, 129);';
  defaultColor = '#fcfdfd';
  constructor(public dateSelectionService: DateSelectionService) {}

  ngOnInit() {}

  get selectedDate() {
    return this.dateSelectionService.selectedDate;
  }

  addDays(numberOfDays: number) {
    this.dateSelectionService.addDays(numberOfDays);
  }
}
