import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Common } from '../../../core/services/common';

@Component({
  selector: 'app-sports-home',
  imports: [CommonModule, NgbNavModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class SportsHome {
  
  active = 1;
  public commonService = inject(Common);
  public showLimit = signal<number>(8);
  public showLimitGames = signal<number>(8);

  loadMoreGames() {
    this.showLimitGames.update(limit => limit + 8);
  }

  hasMoreGames(): boolean {
    return this.commonService.sport().length > this.showLimitGames();
  }
}
