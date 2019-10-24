import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import {fromEvent, Subject} from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'Cosmic';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
  ) {
  }

  ngOnInit() {
    fromEvent(document, 'keyup').pipe().subscribe(character => this.keyPress(character));
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  // Stopwatch
  seconds = 0;
  minutes = 0;
  displaySeconds = '00';
  displayMinutes = '00';
  timerInterval;
  stopped = true;
  startButton = 't';
  stopButton = 'y';

  keyPress(event) {
    if (event.key === this.startButton) {
      if (this.stopped) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    } else if (event.key === this.stopButton) {
      if (this.stopped) {
        this.resetTimer();
      }
    } else {
    }
  }

  // TODO Watch for 10 or 15 minute intervals, display warning
  startTimer() {
    // Set temporary seconds and minutes variables
    let tempSeconds = this.seconds;
    let tempMinutes = this.minutes;
    this.timerInterval = setInterval(() => {
      // ------
      // Slightly more precise version but delta is always mean seconds, probably longer
      // to do it the way I'm doing it below. It takes system date/time at start
      // and at each loop variation. Read readme.md for more info.
      // let delta = Date.now() - start; // milliseconds elapsed since start
      // tempSeconds = Math.floor(delta / 1000).toString(); // in seconds
      // ------
      if (tempSeconds >= 60) {
        tempSeconds = 0;
        tempMinutes += 1;
      }
      // If more than 9 seconds, print number, if not, add a 0 in front
      this.displaySeconds = (tempSeconds > 9 ? tempSeconds.toString() : '0' + tempSeconds.toString());
      this.seconds = tempSeconds;
      this.minutes = tempMinutes;
      // If more than 9 minutes, print number, if not, add a 0 in front.
      this.displayMinutes = (tempMinutes > 9 ? tempMinutes.toString() : ((tempMinutes) ? '0' + tempMinutes.toString() : '00'));
      // Add a number to temp seconds
      tempSeconds += 1;
    }, 1000);
    this.stopped = false;
  }

  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.displaySeconds = '00';
    this.displayMinutes = '00';
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.stopped = true;
  }
}
