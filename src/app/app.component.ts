import { Component } from '@angular/core';
import { BoardNavigationService } from './services/board-navigation.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  constructor(private boardNavigation: BoardNavigationService) {}

  onScroll(e: WheelEvent) {
    this.boardNavigation.scrollZoom(e.deltaY * -1, {
      x: `${e.offsetX}px`,
      y: `${e.offsetY}px`,
    });
  }
}
