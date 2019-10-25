import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-video-feed',
  template: `
      <nb-card size="giant">
          <nb-card-header>Video Feed</nb-card-header>
          <nb-card-body>
              <div echarts [options]="option" class="echart"></div>
          </nb-card-body>
      </nb-card>

  `,
  styles: [],
})
export class VideoFeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
