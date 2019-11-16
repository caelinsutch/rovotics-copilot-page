import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {fromEvent} from 'rxjs';
import {RovService} from '../@core/backend/services/rov.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  rovEnabled: boolean;
  rovPowered: boolean;

  constructor(
      private rovService: RovService,
  ) {
    this.rovEnabled = false;
    this.rovPowered = false;
  }

  ngOnInit() {
    // Handle ROV enable and disable
    // @ts-ignore
    fromEvent(document, 'keyup').pipe(filter(s => s.key === 'e')).subscribe(s => {
      this.rovEnabled = !this.rovEnabled;
      this.toggleRov();
    });
    // Handle power on and off
    // @ts-ignore
    fromEvent(document, 'keyup').pipe(filter(s => s.key === 'p')).subscribe(s => {
      this.rovPowered = !this.rovPowered;
      this.togglePower();
    });
  }

  toggleRov() {
    this.rovService.topic('thrusterStatus').publish({
      data: this.rovEnabled,
    });
  }

  togglePower() {
    this.rovService.topic('tcuPower').publish({
      data: this.rovPowered,
    });
  }

  menu = MENU_ITEMS;
}
