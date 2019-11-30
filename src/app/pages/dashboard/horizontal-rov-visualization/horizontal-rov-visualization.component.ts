import { Component, OnInit } from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-horizontal-rov-visualization',
  templateUrl: './horizontal-rov-visualization.component.html',
  styleUrls: ['./horizontal-rov-visualization.component.scss'],
})
export class HorizontalRovVisualizationComponent implements OnInit {
  thruster1: number = 0;
  thruster2: number = 0;
  thruster3: number = 0;
  thruster4: number = 0;

  constructor(
      private rovService: RovService,
  ) { }

  ngOnInit() {
    this.rovService.topic('horizontalDrive').data.subscribe(v => {
      this.thruster1 = v.t1;
      this.thruster2 = v.t2;
      this.thruster3 = v.t3;
      this.thruster4 = v.t4;
    });
  }

}
