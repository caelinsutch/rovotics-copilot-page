import {AfterViewInit, Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {LayoutService} from '../../../../@core/utils/layout.service';
import {delay, takeWhile} from 'rxjs/operators';

declare const echarts: any;

@Component({
  selector: 'ngx-depth-chart',
  template: `
    <div echarts
         class="echart"
         [options]="option"
         (chartInit)="onChartInit($event)"></div>
  `,
  styleUrls: ['./backside.component.scss'],
})
export class DepthChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  private alive = true;

  @Input() liveUpdateChartData: { value: [string, number] }[];

  option: any;
  echartsInstance: any;
  testData = [
    { value: ['1', 1]},
    { value: ['2', 9]},
    { value: ['3', 3]},
    { value: ['4', 4]},
    { value: ['5', 7]},
    { value: ['6', 3]},
    { value: ['7', 3]},
    { value: ['8', 3]},
    { value: ['9', 3]},
    { value: ['10', 3]},
    { value: ['11', 3]},
    { value: ['12', 3]},
    { value: ['13', 3]},
    { value: ['14', 3]},
    { value: ['15', 3]},
    { value: ['16', 3]},
    { value: ['17', 3]},
    { value: ['18', 3]},
    { value: ['19', 3]},
    { value: ['20', 3]},
    { value: ['21', 3]},
    { value: ['22', 3]},
    { value: ['23', 3]},
    { value: ['24', 3]},
    { value: ['25', 3]},
  ];

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
        .pipe(
          takeWhile(() => this.alive),
        )
        .subscribe(() => this.resizeChart);
  }

  ngOnChanges(): void {
    if (this.option) {
      this.updateChartOptions(this.liveUpdateChartData);
    }
  }

  ngAfterViewInit(): void {
    this.theme.getJsTheme()
        .pipe(
            delay(1),
            takeWhile(() => this.alive),
        )
        .subscribe(config => {
          const earningLineTheme: any = config.variables.earningLine;

          this.setChartOption(earningLineTheme);
        });
    // Test Data
    // setInterval(() => {
    //   for (let y = 0; y < this.testData.length; y++) {
    //     this.testData[y].value[1] += Math.random();
    //   }
    //   this.updateChartOptions(this.testData);
    // }, 500);
  }

  setChartOption(earningLineTheme) {
    this.option = {
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        boundaryGap: [0, '5%'],
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle: {
          color: earningLineTheme.tooltipTextColor,
          fontWeight: earningLineTheme.tooltipFontWeight,
          fontSize: earningLineTheme.tooltipFontSize,
        },
        position: 'top',
        backgroundColor: earningLineTheme.tooltipBg,
        borderColor: earningLineTheme.tooltipBorderColor,
        borderWidth: earningLineTheme.tooltipBorderWidth,
        // formatter: params => `$ ${Math.round(parseInt(params.value[1], 10))}`,
        extraCssText: earningLineTheme.tooltipExtraCss,
      },
      series: [
        {
          type: 'line',
          symbol: 'circle',
          smooth: 'true',
          itemStyle: {
            normal: {
              opacity: 0,
            },
            emphasis: {
              opacity: 0,
            },
          },
          lineStyle: {
            normal: {
              width: 0,
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: earningLineTheme.gradFrom,
              }, {
                offset: 1,
                color: earningLineTheme.gradTo,
              }]),
              opacity: 1,
            },
          },
          data: this.testData,
        },
      ],
      animation: true,
    };
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
    this.alive = false;
  }
}
