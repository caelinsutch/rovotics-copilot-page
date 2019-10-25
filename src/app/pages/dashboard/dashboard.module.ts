import { NgModule } from '@angular/core';
import {
  NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule,
  NbCardModule, NbContextMenuModule, NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule, NbSelectModule,
  NbSidebarModule,
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
  declarations: [...COMPONENTS],
})
export class DashboardModule { }
