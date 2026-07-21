import { Component, inject, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Common } from '../../core/services/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})

export class Sidebar {

  public toggleSidebar = output<void>();
  private router = inject(Router);
  commonService = inject(Common);
  sidebarMode = signal<'general' | 'casino' | 'sports'>('general');

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateSidebarMode(event.urlAfterRedirects);
      });

    this.updateSidebarMode(this.router.url);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  private updateSidebarMode(url: string) {
    if (url.includes('/casino')) {
      this.sidebarMode.set('casino');
    } else if (url.includes('/sports')) {
      this.sidebarMode.set('sports');
    } else {
      this.sidebarMode.set('general');
    }
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
