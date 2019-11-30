import {AfterViewInit, Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {LayoutService} from '../../../@core/utils/layout.service';
import {delay, takeWhile} from 'rxjs/operators';

declare const echarts: any;

@Component({
  selector: 'ngx-dial',
  template: `
    <div echarts
         [options]="option"
         (chartInit)="onChartInit($event)"
         class="echart"></div>
  `,
  styles: [`
    .echart {
      /*left: 1em;*/
      height: 6rem;
      /*width: 80%;*/
    }
  `],
})
export class DialComponent implements AfterViewInit, OnDestroy, OnChanges {

  private alive = true;
  private thrusterTheme;
  private config;
  private ignoreFirst = true;

  @Input() liveThrusterData: number;

  echartsInstance: any;
  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
        .pipe(
            takeWhile(() => this.alive),
        ).subscribe(() => this.resizeChart());
  }


  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {

      const thrusterTheme: any = config.variables.thrusterTheme;
      this.thrusterTheme = thrusterTheme;
      this.config = config;
      this.setChartOptions();
    });

    // this.updateChartOptions(12);
    // setTimeout(() => this.updateChartOptions(40), 2000);
  }

  ngOnChanges(): void {
    if (!this.ignoreFirst) {
      this.updateChartOptions(this.liveThrusterData);
    }
    this.ignoreFirst = false;

  }

  setChartOptions() {
    this.option = Object.assign({}, {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '0',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['45%', '50%'],
          radius: ['70%', '90%'],
          data: [
            {
              value: 50,
              label: {
                normal: {
                  position: 'center',
                  formatter: (params) => {
                    return ((params.data.value - 50) + '%');
                  },
                  textStyle: {
                    fontSize: '16',
                    fontFamily: this.config.variables.fontSecondary,
                    fontWeight: '600',
                    color: this.config.variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: this.thrusterTheme.gradientLeft,
                    },
                    {
                      offset: 1,
                      color: this.thrusterTheme.gradientRight,
                    },
                  ]),
                  shadowColor: this.thrusterTheme.shadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
            {
              value: 50,
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: this.thrusterTheme.secondSeriesFill,
                },
              },
            },
          ],
        },
      ],
    });
  }

  updateChartOptions(number: number) {
    this.echartsInstance.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: '0',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['45%', '50%'],
          radius: ['70%', '90%'],
          data: [
            {
              value: number,
              label: {
                normal: {
                  position: 'center',
                  formatter: (params) => {
                    return (((params.data.value - 50) * 2) + '%');
                  },
                  textStyle: {
                    fontSize: '16',
                    fontFamily: this.config.variables.fontSecondary,
                    fontWeight: '600',
                    color: this.config.variables.fgHeading,
                  },
                },
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: this.thrusterTheme.gradientLeft,
                    },
                    {
                      offset: 1,
                      color: this.thrusterTheme.gradientRight,
                    },
                  ]),
                  shadowColor: this.thrusterTheme.shadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
            {
              value: 100-number,
              tooltip: {
                show: false,
              },
              label: {
                normal: {
                  position: 'inner',
                },
              },
              itemStyle: {
                normal: {
                  color: this.thrusterTheme.secondSeriesFill,
                },
              },
            },
          ],
        },
      ],
    })
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
