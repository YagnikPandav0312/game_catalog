import { Component, inject, Input } from '@angular/core';
import { Common } from '../../../core/services/common';
import { AuthService } from '../../../core/services/auth';
import { Api } from '../../../core/services/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../../authentication/login/login';
import { ToastrService } from 'ngx-toastr';

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
  public apiService = inject(Api);
  public authService = inject(AuthService);
  private modalService = inject(NgbModal);
  private toastr = inject(ToastrService);

  getGameThumbnail(): string {
    if (this.type === 'casino') {
      return this.game?.img || '';
    }
    return this.game?.img || '';
  }

  getGameName(): string {
    if (this.type === 'casino') {
      return this.game?.gn || '';
    }
    return this.game?.sn || '';
  }

  playGame() {
    if (!this.authService.isLoggedIn() || !this.authService.getToken()) {
      this.toastr.warning('Please log in to play the game.');
      this.modalService.dismissAll();
      this.modalService.open(Login, { centered: true, backdrop: 'static' });
      return;
    }

    const user = this.authService.currentUser();
    const player = {
      game_id: this.game?.gid,
      player_id: user?.id
    }
    if (this.type === 'casino') {
      this.commonService.showSpinner();
      this.apiService.saveHistory(player).subscribe({
        next: (res: any) => {
          // this.commonService.RecentGames();
          this.commonService.getRecommendations();
          this.commonService.hideSpinner();
        }, error: (err: any) => {
          this.commonService.manageStatus(err.error.status);
          this.commonService.hideSpinner();
        }
      });
    }
  }
}
