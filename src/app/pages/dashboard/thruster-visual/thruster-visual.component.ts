import {Component, OnInit} from '@angular/core';
import {RovService} from '../../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-thruster-visual',
  template: `
    <nb-card size="tiny">
      <nb-card-header>Thrusters</nb-card-header>
      <nb-card-body>
        <div class="row">
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[0]"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[2]"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[4]"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[1]"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[3]"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-4 col-sm-6 col-xs-12" [liveThrusterData]="thrusters[5]"></ngx-dial>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./thruster-visual.component.scss'],
})
export class ThrusterVisualComponent implements OnInit{
  thrusters: Array<number> = [0, 0, 0, 0, 0, 0];

  constructor(
      private rovService: RovService,
  ) { }

  ngOnInit() {
    this.rovService.topic('horizontalDrive').data.subscribe(v => {
      this.thrusters[0] = v.t1;
      this.thrusters[1] = v.t2;
      this.thrusters[4] = v.t3;
      this.thrusters[5] = v.t4;
    });

    this.rovService.topic('verticalDrive').data.subscribe(v => {
      this.thrusters[2] = v.t1;
      this.thrusters[3] = v.t1;
    });
  }
}
