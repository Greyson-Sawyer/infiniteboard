import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { DateSelectionService } from './date-selection.service';
import { FunNiceFeelingsService } from './fun-nice-feelings.service';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  private __notes: Note[] = [];

  colors = [
    '#FAFAFA',
    '#97C1A9',
    '#B7CFB7',
    '#CCE2CB',
    '#EAEAEA',
    '#C7DBDA',
    '#FFE1E9',
    '#FDD7C2',
    '#F6EAC2',
    '#FFB8B1',
    '#FFDAC1',
    '#E2F0CB',
    '#B5EAD6',
    '#55CBCD',
    '#A3E1DC',
    '#EDEAE5',
    '#FFDBCC',
    '#9AB7D3',
    '#F5D2D3',
    '#F7E1D3',
    '#DFCCF1',
  ];

  constructor(
    private funNiceFeelings: FunNiceFeelingsService,
    private dateSelection: DateSelectionService
  ) {
    this.getNotesFromLocalStorage();
  }

  get notes() {
    if (!this.__notes) return [];
    return this.__notes.filter((note) => {
      return note.date === this.dateSelection.selectedDateAsString;
    });
  }

  get activeNote() {
    return this.notes.find((note) => note.isActive);
  }

  activateNote(note: Note) {
    this.__notes.forEach((note) => {
      note.isActive = false;
    });
    note.isActive = true;
    // console.log(this.__notes.map((note) => note.isActive));
  }

  createNote() {
    const id = this.notes.length;
    const note: Note = {
      id,
      position: {
        x: 100,
        y: 200,
      },
      width: 200,
      height: 200,
      sentiment: this.funNiceFeelings.generateSentiment(id),
      date: this.dateSelection.selectedDateAsString,
      isActive: true,
      backgroundColor: this.colors[0],
      header: '',
      body: '',
    };

    this.__notes.push(note);
    this.activateNote(note);
    this.saveNotesToLocalStorage();
  }

  getNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
      this.__notes = notes;
    }
  }

  saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.__notes));
  }
}
