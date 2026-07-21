import { Component, Inject, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Common } from '../../../core/services/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-casino-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class CasinoHome {

  public commonService = inject(Common);
  public showLimit = signal<number>(8);
  public showLimitGames = signal<number>(8);
  public selectedCategory = signal<number | null>(null);
  public route = inject(ActivatedRoute);
  public router = inject(Router);

  constructor() {
    // this.route.paramMap.subscribe(params => {
    //   const gameTypeIds = JSON.parse(params.get('game_type_id') || '[]');

    //   const filteredGames = this.games().filter(game =>
    //     game.game_type_id.some((id: number) => gameTypeIds.includes(id))
    //   );

    //   this.games.set(filteredGames);
    // });
  }

  // Load more publishers
  loadMore() {
    this.showLimit.update(limit => limit + 8);
  }

  // Check if there are more publishers to show
  hasMoreProviders(): boolean {
    return this.commonService.providers().length > this.showLimit();
  }

  // Load more games
  loadMoreGames() {
    this.showLimitGames.update(limit => limit + 8);
  }

  // Check if there are more games to show
  hasMoreGames(): boolean {
    return this.commonService.games().length > this.showLimitGames();
  }

  // Get realistic player count based on provider ID
  getPlayingCount(providerId: number): string {
    if (providerId === 21) return '4,085'; // Pragmatic Play
    if (providerId === 22) return '1,889'; // Evolution Gaming
    if (providerId === 23) return '2,402'; // NetEnt
    if (providerId === 24) return '1,120'; // Microgaming
    if (providerId === 26) return '723';   // Yggdrasil
    if (providerId === 27) return '895';   // Red Tiger
    if (providerId === 28) return '406';   // Quickspin
    if (providerId === 29) return '1,284'; // Betsoft
    if (providerId === 16) return '317';   // ezuki

    // Fallback deterministic count
    const seed = (providerId * 157) % 3000 + 100;
    return seed.toLocaleString();
  }

  // Set selected category ID
  selectCategory(item: any) {
    this.selectedCategory.set(item.game_categorie_id);
    // this.router.navigate(['/casino/home', item.game_type_id
    // ]);
  }
}

