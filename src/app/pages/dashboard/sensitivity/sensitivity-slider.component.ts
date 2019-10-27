import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngx-sensitivity-slider',
  template: `
    <div class="slider-wrap">
      <input type="range" class="slider" max="100" (input)="setSensitivity(sensitivitySlider.value)" [value]="sensitivity" #sensitivitySlider>
      <div class="slider-foreground" [style.width.%]="getSensitivity()"></div>
    </div>
  `,
  styleUrls: ['./sensitivity-slider.component.scss'],
})
export class SensitivitySliderComponent implements OnInit, OnChanges {

  @Output() sensitivityEmitter = new EventEmitter();
  @Input() inputSensitivity = 0;

  sensitivity = 50;

  constructor() {
    this.sensitivity = 50;
  }

  ngOnInit() {
  }

  /**
   * When input updates
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.sensitivity = Number(this.inputSensitivity);
  }

  setSensitivity(sensitivity: string) {
    this.sensitivity = Number(sensitivity);
    this.sensitivityEmitter.emit(this.sensitivity);
  }

  getSensitivity() {
    return this.sensitivity;
  }

}
