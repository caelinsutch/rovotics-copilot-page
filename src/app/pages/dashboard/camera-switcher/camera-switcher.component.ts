import { Component, OnInit } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';


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

  constructor(
      private rovService: RovService,
  ) { }

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
   * Switch Cameras
   * @param value
   */
  cameraSwitch(value: number) {
    this.resetCamera();
    this.cameras.find(o => o.number === value).activatedMain = true;
    this.rovService.topic('cameraSelect').publish(this.formulateMessage(value));
  }

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
