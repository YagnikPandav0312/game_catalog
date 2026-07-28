import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Common } from '../../../core/services/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { Login } from '../../../authentication/login/login';
import { GameCard } from '../../../shared/components/game-card/game-card';

@Component({
  selector: 'app-casino-home',
  imports: [CommonModule, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class CasinoHome {

  public authService = inject(AuthService);
  public commonService = inject(Common);
  public showLimit = signal<number>(8);
  public showLimitGames = signal<number>(8);
  public selectedCategory = signal<number | null>(null);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public slg = signal<string | null>(null);

  // Computed signal to reactively filter games whenever slg, categories, or games change
  public filteredGames = computed(() => {
    const currentSlug = this.slg();
    const allGames = this.commonService.games() || [];
    const allCategories = this.commonService.categories() || [];

    if (!currentSlug) {
      return allGames;
    }

    // Filter category by slg
    const filteredCategories = allCategories.filter(
      category => category.slg === currentSlug
    );

    // Flatten all gtids into a single array
    const gameIds = filteredCategories.flatMap(category => {
      if (Array.isArray(category.gtid)) {
        return category.gtid.map((id: any) => Number(id));
      } else if (category.gtid != null) {
        return [Number(category.gtid)];
      }
      return [];
    });

    if (gameIds.length === 0) {
      return [];
    }

    // Filter games that have at least one matching gtid
    return allGames.filter(game => {
      if (!game.gtid) return false;
      if (Array.isArray(game.gtid)) {
        return game.gtid.some((id: any) => gameIds.includes(Number(id)));
      }
      return gameIds.includes(Number(game.gtid));
    });
  });

  constructor() {
    this.commonService.getGames();
    this.commonService.getProviders();
    this.commonService.getCategories();
    this.route.paramMap.subscribe(params => {
      const slg = params.get('slg');
      this.slg.set(slg);
    });

    // Sync selectedCategory based on current slg when categories load
    effect(() => {
      const currentSlug = this.slg();
      const categories = this.commonService.categories();
      if (currentSlug && categories.length > 0) {
        const match = categories.find(c => c.slg === currentSlug);
        if (match) {
          this.selectedCategory.set(match.cid);
        }
      } else if (!currentSlug) {
        this.selectedCategory.set(null);
      }
    });
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
    return this.filteredGames().length > this.showLimitGames();
  }

  // Get realistic player count based on provider ID
  getPlayingCount(pid: number): string {
    if (pid === 21) return '4,085'; // Pragmatic Play
    if (pid === 22) return '1,889'; // Evolution Gaming
    if (pid === 23) return '2,402'; // NetEnt
    if (pid === 24) return '1,120'; // Microgaming
    if (pid === 26) return '723';   // Yggdrasil
    if (pid === 27) return '895';   // Red Tiger
    if (pid === 28) return '406';   // Quickspin
    if (pid === 29) return '1,284'; // Betsoft
    if (pid === 16) return '317';   // ezuki

    // Fallback deterministic count
    const seed = (pid * 157) % 3000 + 100;
    return seed.toLocaleString();
  }

  // Set selected category ID
  selectCategory(item: any) {
    if (this.selectedCategory() === item.cid) {
      this.clearFilter();
    } else {
      this.selectedCategory.set(item.cid);
      this.router.navigate(['/casino', item.slg]);
    }
  }

  // Clear selected category filter
  clearFilter() {
    this.selectedCategory.set(null);
    this.router.navigate(['/casino']);
  }

  getCategoryIcon(slg: string | undefined): string {
    if (!slg) return 'fas fa-gamepad text-success';
    const lower = slg.toLowerCase();
    if (lower.includes('slot')) return 'fas fa-cube text-warning';
    if (lower.includes('live')) return 'fas fa-video text-danger';
    if (lower.includes('table') || lower.includes('card') || lower.includes('poker')) return 'fas fa-heart text-danger';
    if (lower.includes('roulette') || lower.includes('dice')) return 'fas fa-dice text-info';
    return 'fas fa-gamepad text-success';
  }
}

