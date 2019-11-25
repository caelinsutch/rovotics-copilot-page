import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngx-thruster-slider',
  template: `
    <div class="slider-wrap">
      <div class="slider-background"></div>
      <div class="slider-foreground" [style.width.%]="getValue()"></div>
    </div>
  `,
  styleUrls: ['./thruster-slider.component.scss'],
})
export class ThrusterSliderComponent implements OnChanges {

  @Input() inputValue: number = 0;
  value = 0;

  constructor() {
    this.value = 70;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = Number(this.inputValue);
  }
  getValue() {
    return this.value;
  }

}
