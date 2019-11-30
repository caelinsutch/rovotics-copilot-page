import { Component, OnInit } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-vertical-rov-visualization',
  templateUrl: './vertical-rov-visualization.component.html',
  styleUrls: ['./vertical-rov-visualization.component.scss']
})
export class VerticalRovVisualizationComponent implements OnInit {

  thruster1: number = 0;
  thruster2: number = 0;

  constructor(
      private rovService: RovService,
  ) { }

  ngOnInit() {
    this.rovService.topic('verticalDrive').data.subscribe(v => {
      this.thruster1 = v.t1;
      this.thruster2 = v.t2;
    });
  }

}
