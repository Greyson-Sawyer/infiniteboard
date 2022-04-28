import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider/slider';
import { BoardNavigationService } from '../services/board-navigation.service';

@Component({
  selector: 'zoom-controls',
  templateUrl: './zoom-controls.component.html',
  styleUrls: ['./zoom-controls.component.css'],
})
export class ZoomControlsComponent implements OnInit {
  constructor(public boardNavigation: BoardNavigationService) {}

  ngOnInit() {}

  changeZoom(e: MatSliderChange) {
    this.boardNavigation.changeZoom(e.value, { x: '50%', y: '50%' });
  }

  scrollZoom(delta: number) {
    this.boardNavigation.scrollZoom(delta, { x: '50%', y: '50%' });
  }
}
