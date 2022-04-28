import { Injectable } from '@angular/core';
import { FunNiceFeeling } from '../models/fun-nice-feeling.model';

@Injectable({
  providedIn: 'root',
})
export class FunNiceFeelingsService {
  funNiceFeelings: FunNiceFeeling[] = [
    {
      sentiment: 'hi buddy',
    },
    {
      sentiment: 'hey pal',
    },
    {
      sentiment: 'hey friend',
    },
    {
      sentiment: 'howdy',
    },
    {
      sentiment: 'heyo',
    },
    {
      sentiment: 'hey',
    },
  ];
  constructor() {}

  generateSentiment(noteId: number) {

    const rando = Math.floor(Math.random() * this.funNiceFeelings.length);
    const selectedFunNiceFeeling = this.funNiceFeelings[rando];
    return selectedFunNiceFeeling.sentiment;
  }
}
