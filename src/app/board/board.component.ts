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

  onPan(event){
    console.log(event)
  }

  startDrag(e: MouseEvent) {
    this.boardNavigation.startDrag(e.clientX, e.clientY);
  }

  panStart(event) {
    this.boardNavigation.startPan(event.deltaX, event.deltaY);
  }

  panMove(event) {
    this.boardNavigation.panMove(event.deltaX, event.deltaY);
  }

  get dotMatrixPosition() {
    return `calc(50% + ${
      this.boardNavigation.position.x * this.zoomAmount
    }px), calc(50% + ${this.boardNavigation.position.y * this.zoomAmount}px)`;
  }
}
