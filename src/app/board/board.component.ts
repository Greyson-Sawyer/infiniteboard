import { Component, OnInit } from '@angular/core';
import { BoardNavigationService } from '../services/board-navigation.service';
import { FakeDataService } from '../services/fake-data.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  constructor(
    public boardNavigation: BoardNavigationService,
    public data: FakeDataService
  ) {}

  ngOnInit() {}

  get notes() {
    return this.data.notes;
  }

  get zoomAmount() {
    return this.boardNavigation.zoom.amount;
  }

  mousedown(e: MouseEvent) {
    this.boardNavigation.startDrag(e.clientX, e.clientY);
  }

  get dotMatrixPosition(){
    return  `calc(50% + ${this.boardNavigation.position.x * this.zoomAmount}px), calc(50% + ${this.boardNavigation.position.y * this.zoomAmount}px)`
  }
}
