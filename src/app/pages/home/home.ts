import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../core/services/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  public showLimitGames = signal<number>(8);
  public showLimitSport = signal<number>(8);
  public commonService = inject(Common);

  loadMoreSport() {
    this.showLimitSport.update(limit => limit + 8);
  }

  hasMoreSport(): boolean {
    return this.commonService.sport().length > this.showLimitSport();
  }

  loadMoreCasino() {
    this.showLimitGames.update(limit => limit + 8);
  }

  hasMoreCasino(): boolean {
    return this.commonService.games().length > this.showLimitGames();
  }

}
