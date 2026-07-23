import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Common } from '../../core/services/common';
import { CasinoHome } from '../casino/home/home';
import { SportsHome } from '../sports/home/home';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CasinoHome, SportsHome],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  public showLimitGames = signal<number>(8);
  public showLimitSport = signal<number>(8);
  public commonService = inject(Common);
  private route = inject(ActivatedRoute);

  public type = signal<string | null>(null);
  public slug = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.type.set(params.get('type'));
      this.slug.set(params.get('slug'));
    });
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
