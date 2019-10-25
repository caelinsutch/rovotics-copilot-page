import {Component} from '@angular/core';

@Component({
  selector: 'ngx-thruster-visual',
  template: `
    <nb-card size="small">
      <nb-card-header>Thrusters</nb-card-header>
      <nb-card-body>
        <div class="row">
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
          <ngx-dial class="col-lg-4 col-md-6 col-sm-12"></ngx-dial>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./thruster-visual.component.scss'],
})
export class ThrusterVisualComponent {

}
