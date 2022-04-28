import { Component, OnInit } from '@angular/core';
import { DateSelectionService } from '../services/date-selection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dateSelectionService: DateSelectionService) {}

  ngOnInit() {}

  get selectedDate() {
    return this.dateSelectionService.selectedDate;
  }

  

  addDays(numberOfDays: number) {
    this.dateSelectionService.addDays(numberOfDays);
  }
}
