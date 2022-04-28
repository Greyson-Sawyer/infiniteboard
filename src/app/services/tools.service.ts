import { Injectable } from '@angular/core';
import { Tool } from '../models/tool.model';
import { FakeDataService } from './fake-data.service';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  tools: Tool[] = [
    {
      name: 'Text',
      icon: 'text_fields',
    },
    {
      name: 'Note',
      icon: 'text_snippet',
    },
    {
      name: 'Todo',
      icon: 'checklist',
    },
  ];
  constructor() {}
}
