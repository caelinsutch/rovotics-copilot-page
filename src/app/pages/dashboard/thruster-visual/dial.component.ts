import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
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
      height: 8rem;
      /*width: 80%;*/
    }
  `],
})
export class DialComponent implements AfterViewInit, OnChanges, OnDestroy {

  private alive = true;

  @Input() liveThrusterData: { value: [string, number] }[];

  echartsInstance: any;
  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
        .pipe(
            takeWhile(() => this.alive),
        )
        .subscribe(() => this.resizeChart());
  }


  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {

      const thrusterTheme: any = config.variables.thrusterTheme;
      this.setChartOptions(thrusterTheme, config);

    });
  }

  ngOnChanges(): void {
    if (this.option) {
      this.updateChartOptions(this.liveThrusterData);
    }
  }

  setChartOptions(thrusterTheme, config) {
    this.option = Object.assign({}, {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      series: [
        {
          name: ' ',
          clockWise: true,
          hoverAnimation: false,
          type: 'pie',
          center: ['45%', '50%'],
          radius: ['70%', '90%'],
          data: [
            {
              value: 13,
              name: ' ',
              label: {
                normal: {
                  position: 'center',
                  formatter: '{d}%',
                  textStyle: {
                    fontSize: '16',
                    fontFamily: config.variables.fontSecondary,
                    fontWeight: '600',
                    color: config.variables.fgHeading,
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
                      color: thrusterTheme.gradientLeft,
                    },
                    {
                      offset: 1,
                      color: thrusterTheme.gradientRight,
                    },
                  ]),
                  shadowColor: thrusterTheme.shadowColor,
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowOffsetY: 3,
                },
              },
              hoverAnimation: false,
            },
            {
              value: 87,
              name: ' ',
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
                  color: thrusterTheme.secondSeriesFill,
                },
              },
            },
          ],
        },
      ],
    });

  }

  updateChartOptions(chartData: { value: [string, number] }[]) {
    this.echartsInstance.setOption({
      series: [{
        data: chartData,
      }],
    });
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
