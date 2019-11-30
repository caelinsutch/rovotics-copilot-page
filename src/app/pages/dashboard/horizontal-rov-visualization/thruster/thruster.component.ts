import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-thruster',
  template: `
      <div class="thruster-wrapper row">
        <ngx-thruster-slider [inputValue]="negativeVector" class="vector col-5 p-0" style="transform: rotate(180deg)"></ngx-thruster-slider>
        <div class="col-2 p-0">
          <div class="thruster mx-auto"></div>
        </div>
        <ngx-thruster-slider [inputValue]="positiveVector" class="vector col-5 p-0"></ngx-thruster-slider>
      </div>
  `,
  styleUrls: ['./thruster.component.scss']
})
export class ThrusterComponent implements OnChanges {

  @Input() inputThrusterPercentage: number = 100;
  positiveVector: number = 0;
  negativeVector: number = 0;

  constructor() { }

  ngOnChanges() {
    if (this.inputThrusterPercentage < 0) {
      this.positiveVector = 0;
      this.negativeVector = Math.abs(this.inputThrusterPercentage);
    } else {
      this.negativeVector = 0;
      this.positiveVector = Math.abs(this.inputThrusterPercentage);

    }
  }

}
