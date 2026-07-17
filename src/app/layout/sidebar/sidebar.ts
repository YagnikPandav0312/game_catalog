import { Component, inject, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  toggleSidebar = output<void>();
  private router = inject(Router);

  sidebarMode = signal<'general' | 'casino' | 'sports'>('general');

  constructor() {
    // Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateSidebarMode(event.urlAfterRedirects);
      });

    // Initial state
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
}
