import { Component, OnInit } from '@angular/core';


interface Camera {
  number: number;
  connected: boolean;
  activatedMain: boolean;
  activatedSecondary: boolean;
}

@Component({
  selector: 'ngx-camera-switcher',
  templateUrl: './camera-switcher.component.html',
  styles: [],
})

export class CameraSwitcherComponent implements OnInit {

  test = [];
  cameras: Array<Camera>;

  constructor() { }

  ngOnInit() {
    // Initialize Camera List
    this.cameras = [
      {
        number: 1,
        connected: true,
        activatedMain: false,
        activatedSecondary: false,
      },
      {
        number: 2,
        connected: true,
        activatedMain: true,
        activatedSecondary: false,
      },
      {
        number: 3,
        connected: true,
        activatedMain: false,
        activatedSecondary: true,
      },
      {
        number: 4,
        connected: true,
        activatedMain: false,
        activatedSecondary: false,
      },
      {
        number: 5,
        connected: false,
        activatedMain: false,
        activatedSecondary: false,
      },
      {
        number: 6,
        connected: false,
        activatedMain: false,
        activatedSecondary: false,
      },
    ];
  }

}
