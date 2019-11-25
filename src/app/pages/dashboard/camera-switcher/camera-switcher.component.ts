import { Component, OnInit } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';
import {fromEvent} from 'rxjs';


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

  cameras: Array<Camera>;

  constructor(
      private rovService: RovService,
  ) { }

  ngOnInit() {
    fromEvent(document, 'keyup').pipe().subscribe(character => this.keyPress(character));
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
        activatedSecondary: false,
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
      {
        number: 7,
        connected: false,
        activatedMain: false,
        activatedSecondary: false,
      },
    ];
  }

  /**
   * Handle keypresses
   * @param event
   */
  keyPress(event) {
    this.cameraSwitch(Number(event.key));
  }

  /**
   * Switch Cameras
   * @param value
   */
  cameraSwitch(value: number) {
    if (value < 8 && this.cameras.find(o => o.number === value).connected === true) {
      this.resetCamera();
      this.cameras.find(o => o.number === value).activatedMain = true;
      this.rovService.topic('cameraSelect').publish(this.formulateMessage(value));
    }
  }

  /**
   * Reset all camera activated values
   */
  resetCamera() {
    for (let i = 0; i < this.cameras.length; i++) {
      this.cameras[i].activatedMain = false;
      this.cameras[i].activatedSecondary = false;
    }
  }

  /**
   * Parses message for ROS
   * @param value
   */
  formulateMessage(value: number) {
    return {data: value};
  }

}
