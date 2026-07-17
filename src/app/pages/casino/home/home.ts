import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Common } from '../../../core/services/common';
import { Casino } from '../../../core/services/casino';

@Component({
  selector: 'app-casino-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class CasinoHome {

  private casinService = inject(Casino);
  public games = signal<any[]>([]);
  public providers = signal<any[]>([]);
  public categories = signal<any[]>([]);
  public commonService = inject(Common);

  // Publishers pagination limit
  public showLimit = signal<number>(8);
  // Games pagination limit
  public showLimitGames = signal<number>(8);
  // Active selected category tracking
  public selectedCategory = signal<number | null>(null);

  constructor() {
    this.getHome();
  }

  getHome() {
    this.commonService.showSpinner();
    this.casinService.getHome().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.games.set(res.data.games);
          this.providers.set(res.data.providers);
          this.categories.set(res.data.categories)
          this.commonService.hideSpinner();
        } else {
          this.commonService.manageStatus(res.status);
          this.commonService.hideSpinner();
        }
      }, error: (err: any) => {
        this.commonService.manageStatus(err.status);
        this.commonService.hideSpinner();
      }
    })
  }

  // Load more publishers
  loadMore() {
    this.showLimit.update(limit => limit + 8);
  }

  // Check if there are more publishers to show
  hasMoreProviders(): boolean {
    return this.providers().length > this.showLimit();
  }

  // Load more games
  loadMoreGames() {
    this.showLimitGames.update(limit => limit + 8);
  }

  // Check if there are more games to show
  hasMoreGames(): boolean {
    return this.games().length > this.showLimitGames();
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
  selectCategory(categoryId: number | null) {
    this.selectedCategory.set(categoryId);
  }
}

