import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Common } from './core/services/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

  protected readonly title = signal('game_catalog');
  public commonService = inject(Common);

  constructor() {
    this.commonService.getSport();
    this.commonService.getCasino();
  }

}
