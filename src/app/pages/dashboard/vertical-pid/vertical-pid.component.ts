import { Component, OnInit } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-vertical-pid',
  template: `
    <nb-card size="tiny">
      <nb-card-header>
        Vertical PID
      </nb-card-header>
      <nb-card-body>
        <svg width="5" height="180" viewBox="0 0 5 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 180L1 180" stroke="white" stroke-linecap="round"/>
          <path d="M4 160L1 160" stroke="white" stroke-linecap="round"/>
          <path d="M4 140L1 140" stroke="white" stroke-linecap="round"/>
          <path d="M4 120L1 120" stroke="white" stroke-linecap="round"/>
          <path d="M4 100L1 100" stroke="white" stroke-linecap="round"/>
          <path d="M4 80L1 80" stroke="white" stroke-linecap="round"/>
          <path d="M4 60L1 60" stroke="white" stroke-linecap="round"/>
          <path d="M4 40L1 40" stroke="white" stroke-linecap="round"/>
          <path d="M4 20L1 20" stroke="white" stroke-linecap="round"/>
          <path d="M4 1L1 1" stroke="white" stroke-linecap="round"/>
          <path d="M4 1V180" stroke="white"/>
        </svg>
        <svg width="42" height="7" viewBox="0 0 42 7" fill="none" xmlns="http://www.w3.org/2000/svg" id="set">
          <rect width="42" height="7" fill="#3366FF"/>
        </svg>
        <svg width="20" height="7" viewBox="0 0 20 7" fill="none" xmlns="http://www.w3.org/2000/svg" id="actual" [style.marginTop.px]="actualMargin">
          <rect width="20" height="7" fill="#00D68F"/>
        </svg>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./vertical-pid.component.scss'],
})
export class VerticalPidComponent implements OnInit {
  actualDepth: number;
  setDepth: number;
  difference: number;
  actualMargin: number;

  constructor(
      private rovService: RovService,
  ) {
    this.actualDepth = 0;
    this.setDepth = 0;
    this.difference = 0;
  }


  ngOnInit() {
    this.rovService.topic('externalTelemetry').data.subscribe(v => {
      if (v.tempC !== 0) {
        this.actualDepth = v.depth;
        this.difference = this.setDepth - this.actualDepth;
        this.calculateMargin();
      }
    });

    this.rovService.topic('verticalPidSetPoint').data.subscribe(v=> {
      this.setDepth = v.data;
      this.difference = this.setDepth - this.actualDepth;
      this.calculateMargin();
    });
  }

  /**
   * Returns -180 to 180 margin top for the setPoint. Increments of 40px are a tick
   * From middle to top or bottom is considered one whole meter
   */
  calculateMargin() {
    this.actualMargin = -this.difference * 180;
  }

}
