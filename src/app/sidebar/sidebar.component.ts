import { Component, OnInit } from '@angular/core';
import { Tool } from '../models/tool.model';
import { FakeDataService } from '../services/fake-data.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public toolsService: ToolsService,
    public data: FakeDataService
  ) {}

  ngOnInit() {}

  get tools() {
    return this.toolsService.tools;
  }

  generateFn(tool: any) {
    tool.generateFn();
  }

  actionBaby(tool: Tool) {
    if (tool.name === 'Note') {
      this.data.createNote();
    }
  }
}
