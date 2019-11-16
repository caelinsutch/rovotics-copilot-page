import { NgModule } from '@angular/core';
import {
  NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule,
  NbCardModule, NbContextMenuModule, NbIconModule,
  NbLayoutModule, NbListModule,
  NbMenuModule,
  NbSearchModule, NbSelectModule,
  NbSidebarModule, NbTabsetModule, NbToggleModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CameraSwitcherComponent } from './camera-switcher/camera-switcher.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { ThrusterVisualComponent } from './thruster-visual/thruster-visual.component';
import { TelemetryComponent } from './telemetry/telemetry.component';
import { SensitivityComponent } from './sensitivity/sensitivity.component';
import { ThrusterGraphComponent } from './thruster-graph/thruster-graph.component';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { DialComponent } from './thruster-visual/dial.component';
import { SensitivitySliderComponent } from './sensitivity/sensitivity-slider.component';
import { DepthChartComponent } from './telemetry/backside/depth-chart.component';
import { BacksideComponent } from './telemetry/backside/backside.component';
import { FrontsideComponent } from './telemetry/frontside/frontside.component';
import { VerticalPidComponent } from './vertical-pid/vertical-pid.component';
import { HorizontalPidComponent } from './horizontal-pid/horizontal-pid.component';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbAlertModule,
  NbCardModule,
  NbBadgeModule,
  NbTabsetModule,
  NbListModule,
  NbToggleModule,
];

const COMPONENTS = [
  DashboardComponent,
  CameraSwitcherComponent,
  ThrusterVisualComponent,
  TelemetryComponent,
  SensitivityComponent,
  ThrusterGraphComponent,
  VideoFeedComponent,
];

@NgModule({
  imports: [...NB_MODULES, ThemeModule, NgxEchartsModule],
  declarations: [...COMPONENTS, DialComponent, SensitivitySliderComponent, DepthChartComponent, BacksideComponent, FrontsideComponent, VerticalPidComponent, HorizontalPidComponent],
})
export class DashboardModule { }
