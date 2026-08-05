import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../core/services/common';
import { AuthService } from '../../core/services/auth';
import { GameCard } from '../../shared/components/game-card/game-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  public showLimitGames = signal<number>(8);
  public showLimitSport = signal<number>(8);
  public commonService = inject(Common);
  public authService = inject(AuthService);

  constructor() {
    this.commonService.getGames();
    this.commonService.getSport();
  }

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
