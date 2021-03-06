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
      ? this.offWhite
      : this.gray;
  }

  @HostBinding('style.color') get foregroundColor() {
    return this.dateSelectionService.isTheSelectedDateTodaysDate
      ? this.black
      : this.offBlack;
  }

  highlightColor = 'rgb(56, 127, 129)';
  offWhite = 'rgba(255, 255, 255, 0.87)';
  black = 'rgba(0, 0, 0, 0.87)';
  offBlack = 'rgba(0, 0, 0, 0.6)';
  gray = 'rgba(255,255,255,0.2)';
  constructor(public dateSelectionService: DateSelectionService) {}

  ngOnInit() {}

  get selectedDate() {
    return this.dateSelectionService.selectedDate;
  }

  addDays(numberOfDays: number) {
    this.dateSelectionService.addDays(numberOfDays);
  }
}
