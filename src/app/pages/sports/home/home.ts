import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Common } from '../../../core/services/common';
import { GameCard } from '../../../shared/components/game-card/game-card';

@Component({
  selector: 'app-sports-home',
  imports: [CommonModule, NgbNavModule, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class SportsHome {
  
  active = 1;
  public commonService = inject(Common);
  public showLimit = signal<number>(8);
  public showLimitGames = signal<number>(8);

  constructor() {
    this.commonService.getSport();
  }

  loadMoreGames() {
    this.showLimitGames.update(limit => limit + 8);
  }

  hasMoreGames(): boolean {
    return this.commonService.sport().length > this.showLimitGames();
  }
}
