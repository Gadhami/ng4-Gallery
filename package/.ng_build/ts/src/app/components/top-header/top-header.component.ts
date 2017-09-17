import { Component, OnInit } from '@angular/core';

@Component({
    selector   : 'app-top-header',
    template: `
      <h1>
          <ng-content></ng-content>
      </h1>

      <hr />
    `,
    styles: [`
      h1
      {
          padding: 10px 20px 0 20px;
      }
      hr
      {
          border-top-color: #e9ecef;
          margin: 25px;
      }
    `]
})
export class TopHeaderComponent implements OnInit
{
    constructor() { }

    ngOnInit() {
    }
}
