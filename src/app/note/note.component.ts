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
  @HostListener('mousedown', ['$event']) onMouseDown(e: any) {
    const isTargetHeader = e.target.classList.contains('input-header');
    if (isTargetHeader) {
      this.startDrag(e.clientX, e.clientY, 'header');
    } else if (!this.isActive) {
      this.startDrag(e.clientX, e.clientY, 'body');
    }
  }

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

  @ViewChild('noteheader') noteHeaderInput: ElementRef;
  @ViewChild('notebody') noteBodyInput: ElementRef;

  isSettingsOpen = false;

  dragListenerFn: any;
  stopDragListenerFn: any;
  __dragPos = {
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

  deactivateNoteListenerFn: any;

  constructor(
    private renderer: Renderer2,
    private boardNavigation: BoardNavigationService,
    public data: FakeDataService,
    private noteElement: ElementRef
  ) {}

  ngOnInit() {
    if (this.note.isActive) {
      this.activateNote('body');
    }
  }

  get headerText() {
    return `Note #${this.note.id}`;
  }

  get dragPos() {
    return this.__dragPos;
  }

  set dragPos(pos: { x: number; y: number }) {
    this.__dragPos = pos;
  }

  //
  //
  // DRAG
  //

  startDrag(dragStartX: number, dragStartY: number, clickedElement: string) {
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
      // If the note hasn't moved, this will activate the note.
      if (dragStartX === this.dragPos.x && dragStartY === this.dragPos.y) {
        if (!this.note.isActive) {
          this.activateNote(clickedElement);
        }
      }
      // No matter what, kills both of these listeners
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
        this.saveNote();
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

  //
  //
  // UTILITY
  //

  saveNote() {
    this.data.saveNotesToLocalStorage();
  }

  activateNote(clickedElement: string) {
    this.data.activateNote(this.note);
    if (clickedElement === 'header') this.focusHeader();
    if (clickedElement === 'body') this.focusBody();
    // Now that the note is activated, listen for the next mousedown
    // And possibly deactive the note if clicked elsewhere
    this.deactivateNoteListenerFn = this.renderer.listen(
      'window',
      'mousedown',
      (m: MouseEvent) => {
        // If the mousedown event is not on the note, it will deactive the note
        if (!this.noteElement.nativeElement.contains(m.target)) {
          this.data.deactiveAllNotes();
          this.deactivateNoteListenerFn();
        }
      }
    );
  }

  deleteNote() {
    this.data.deleteNote(this.note);
  }

  focusHeader() {
    // Has to have a slight delay to avoid focusing a disabled input
    // which is not allowed
    setTimeout(() => this.noteHeaderInput.nativeElement.focus(), 0);
  }

  focusBody() {
    setTimeout(() => this.noteBodyInput.nativeElement.focus(), 0);
  }
}
