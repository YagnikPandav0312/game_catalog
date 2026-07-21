import { Component, computed, effect, inject, signal } from '@angular/core';
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
  public slug = signal<string | null>(null);

  // Computed signal to reactively filter games whenever slug, categories, or games change
  public filteredGames = computed(() => {
    const currentSlug = this.slug();
    const allGames = this.commonService.games() || [];
    const allCategories = this.commonService.categories() || [];

    if (!currentSlug) {
      return allGames;
    }

    // Filter category by slug
    const filteredCategories = allCategories.filter(
      category => category.slug === currentSlug
    );

    // Flatten all game_type_ids into a single array
    const gameIds = filteredCategories.flatMap(category => {
      if (Array.isArray(category.game_type_id)) {
        return category.game_type_id.map((id: any) => Number(id));
      } else if (category.game_type_id != null) {
        return [Number(category.game_type_id)];
      }
      return [];
    });

    if (gameIds.length === 0) {
      return [];
    }

    // Filter games that have at least one matching game_type_id
    return allGames.filter(game => {
      if (!game.game_type_id) return false;
      if (Array.isArray(game.game_type_id)) {
        return game.game_type_id.some((id: any) => gameIds.includes(Number(id)));
      }
      return gameIds.includes(Number(game.game_type_id));
    });
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.slug.set(slug);
    });

    // Sync selectedCategory based on current slug when categories load
    effect(() => {
      const currentSlug = this.slug();
      const categories = this.commonService.categories();
      if (currentSlug && categories.length > 0) {
        const match = categories.find(c => c.slug === currentSlug);
        if (match) {
          this.selectedCategory.set(match.game_categorie_id);
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
    if (this.selectedCategory() === item.game_categorie_id) {
      this.clearFilter();
    } else {
      this.selectedCategory.set(item.game_categorie_id);
      this.router.navigate(['/casino/home', item.slug]);
    }
  }

  // Clear selected category filter
  clearFilter() {
    this.selectedCategory.set(null);
    this.router.navigate(['/casino/home']);
  }

  getCategoryIcon(slug: string | undefined): string {
    if (!slug) return 'fas fa-gamepad text-success';
    const lower = slug.toLowerCase();
    if (lower.includes('slot')) return 'fas fa-cube text-warning';
    if (lower.includes('live')) return 'fas fa-video text-danger';
    if (lower.includes('table') || lower.includes('card') || lower.includes('poker')) return 'fas fa-heart text-danger';
    if (lower.includes('roulette') || lower.includes('dice')) return 'fas fa-dice text-info';
    return 'fas fa-gamepad text-success';
  }
}

