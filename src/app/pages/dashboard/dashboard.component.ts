import { Component } from '@angular/core';
import {RovService} from '../../@core/backend/services/rov.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(
    private rovService: RovService,
  ) {}
}
