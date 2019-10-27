import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sensitivity',
  templateUrl: './sensitivity.component.html',
  styles: [],
})
export class SensitivityComponent {
  xSensitivity: number = 50;
  ySensitivity: number = 50;
  zSensitivity: number = 50;
  /**
   * Updates sensitivity
   * @param axis 1 = x, 2 = y, 3 = z
   * @param event Contains a string number
   */
  updateSensitivity(axis: number, event) {
    switch (axis) {
      case 1:
        this.xSensitivity = Number(event);
        break;
      case 2:
        this.ySensitivity = Number(event);
        break;
      case 3:
        this.zSensitivity = Number(event);
        break;
      case 4:
        this.xSensitivity = this.ySensitivity = this.zSensitivity = Number(event);
    }
  }

}
