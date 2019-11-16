import { Component } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-sensitivity',
  templateUrl: './sensitivity.component.html',
  styles: [],
})
export class SensitivityComponent {
  linearSensitivity: number = 50;
  angularSensitivity: number = 50;
  verticalSensitivity: number = 50;

  constructor(
      private rosService: RovService,
  ) {}

  /**
   * Updates sensitivity
   * @param axis 1 = x, 2 = y, 3 = z
   * @param event Contains a string number
   */
  updateSensitivity(axis: number, event) {
    switch (axis) {
      case 1:
        this.linearSensitivity = Number(event);
        break;
      case 2:
        this.angularSensitivity = Number(event);
        break;
      case 3:
        this.verticalSensitivity = Number(event);
        break;
      case 4:
        this.linearSensitivity = this.angularSensitivity = this.verticalSensitivity = Number(event);
    }
    this.publishRosMessage();
  }

  publishRosMessage() {
    this.rosService.topic('sensitivity').publish({
      l_scale: this.linearSensitivity,
      a_scale: this.angularSensitivity,
      v_scale: this.verticalSensitivity,
    });
  }

}
