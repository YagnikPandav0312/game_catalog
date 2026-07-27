import { Component, inject, Input } from '@angular/core';
import { Common } from '../../../core/services/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {
  @Input({ required: true }) game: any;
  @Input() type: 'casino' | 'sport' = 'casino';

  public commonService = inject(Common);
  public authService = inject(AuthService);

  getGameThumbnail(): string {
    if (this.type === 'casino') {
      return this.game?.thumbnail || '';
    }
    return this.game?.logo || '';
  }

  getGameName(): string {
    if (this.type === 'casino') {
      return this.game?.game_name || '';
    }
    return this.game?.sport_name || '';
  }

  playGame() {
    const user = this.authService.currentUser();
    const player = {
      game_id: this.game?.game_id,
      player_id: user?.id
    }
    if (this.type === 'casino') {
      this.commonService.showSpinner();
      this.commonService.saveHistory(player).subscribe({
        next: (res: any) => {
          this.commonService.RecentGames();
          this.commonService.hideSpinner();
        }, error: (err: any) => {
          this.commonService.manageStatus(err.error.status);
          this.commonService.hideSpinner();
        }
      });
    }
  }
}
