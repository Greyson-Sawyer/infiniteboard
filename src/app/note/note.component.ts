import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Note } from '../models/note.model';
import { BoardNavigationService } from '../services/board-navigation.service';
import { FakeDataService } from '../services/fake-data.service';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @HostListener('mousedown', ['$event']) onMouseDown(e: MouseEvent) {
    if (!this.isActive) {
      this.startDrag(e.clientX, e.clientY);
    }
  }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    console.log('fired');
    this.data.activateNote(this.note);
  }

  // @HostListener('panstart', ['$event']) onPanStart(event) {

  //   this.panPos = this.note.position;
  //   this.panMove(event.deltaX, event.deltaY);
  // }

  // @HostListener('panmove', ['$event']) onPanMove(event) {
  //   this.panMove(event.deltaX, event.deltaY);
  // }

  @HostBinding('style.left') get left() {
    return this.note.position.x + 'px';
  }
  @HostBinding('style.top') get top() {
    return this.note.position.y + 'px';
  }

  @HostBinding('style.width') get width() {
    return this.note.width + 'px';
  }

  @HostBinding('style.height') get height() {
    return this.note.height + 'px';
  }

  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.note.backgroundColor;
  }

  @HostBinding('class.active') get isActive() {
    return this.note.isActive;
  }

  isSettingsOpen = false;

  dragListenerFn: any;
  stopDragListenerFn: any;
  dragPos = {
    x: 0,
    y: 0,
  };

  panPos = {
    x: 0,
    y: 0,
  };

  resizeListenerFn: any;
  stopResizeListenerFn: any;
  resizePos = {
    x: 0,
    y: 0,
  };

  constructor(
    private renderer: Renderer2,
    private boardNavigation: BoardNavigationService,
    public data: FakeDataService
  ) {}

  ngOnInit() {}

  get headerText() {
    return `Note #${this.note.id}`;
  }

  //
  //
  // DRAG
  //

  startDrag(dragStartX: number, dragStartY: number) {
    if (this.dragListenerFn) {
      this.dragListenerFn();
      this.stopDragListenerFn();
    }
    this.dragPos.x = dragStartX;
    this.dragPos.y = dragStartY;
    this.dragListenerFn = this.renderer.listen(
      'window',
      'mousemove',
      (m: MouseEvent) => {
        const deltaX = m.clientX - this.dragPos.x;
        const deltaY = m.clientY - this.dragPos.y;
        this.note.position.x += deltaX / this.boardNavigation.zoom.amount;
        this.note.position.y += deltaY / this.boardNavigation.zoom.amount;
        this.dragPos.x = m.clientX;
        this.dragPos.y = m.clientY;
      }
    );
    this.stopDragListenerFn = this.renderer.listen('window', 'mouseup', () => {
      // Kills both of these listeners
      this.dragListenerFn();
      this.stopDragListenerFn();
      this.saveNote();
    });
  }

  // PAN

  panMove(deltaX: number, deltaY: number) {
    this.note.position = {
      x: this.panPos.x + deltaX / this.boardNavigation.zoom.amount,
      y: this.panPos.y + deltaY / this.boardNavigation.zoom.amount,
    };
  }

  // RESIZE

  startResize(resizeStartX: number, resizeStartY: number) {
    if (this.resizeListenerFn) {
      this.resizeListenerFn();
      this.stopResizeListenerFn();
    }
    this.resizePos.x = resizeStartX;
    this.resizePos.y = resizeStartY;
    this.resizeListenerFn = this.renderer.listen(
      'window',
      'mousemove',
      (m: MouseEvent) => {
        const deltaX = m.clientX - this.resizePos.x;
        const deltaY = m.clientY - this.resizePos.y;
        this.note.width += deltaX / this.boardNavigation.zoom.amount;
        this.note.height += deltaY / this.boardNavigation.zoom.amount;
        this.resizePos.x = m.clientX;
        this.resizePos.y = m.clientY;
      }
    );
    this.stopResizeListenerFn = this.renderer.listen(
      'window',
      'mouseup',
      () => {
        this.resizeListenerFn();
        this.stopResizeListenerFn();
      }
    );
  }

  //
  //
  // SETTINGS
  //

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  selectColor(color: string) {
    this.note.backgroundColor = color;
    this.isSettingsOpen = false;
    this.saveNote();
  }

  saveNote() {
    this.data.saveNotesToLocalStorage();
  }
}
