import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements OnInit {

  isLastOpen = false;
  groups = [
    {
      title: 'Group Header - 1',
      content: 'Dynamic group body text - 1'
    },
    {
      title: 'Group Header - 2',
      content: 'Dynamic group body text - 2'
    }
  ];

  addGroupItem(): void {
    this.groups.push({
      title: `Group Header - ${this.groups.length + 1}`,
      content: `Dynamic group body text - ${this.groups.length + 1}`
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
