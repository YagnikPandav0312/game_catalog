import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  sidebarOpen = signal(typeof window !== 'undefined' ? window.innerWidth > 768 : true);

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
