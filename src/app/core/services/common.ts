import { effect, inject, Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../models/api.model';
import { Api } from './api';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})

export class Common {

  public spinnerService = inject(NgxSpinnerService);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private apiService = inject(Api);

  public sport = signal<any[]>([]);
  public games = signal<any[]>([]);
  public providers = signal<any[]>([]);
  public categories = signal<any[]>([]);
  public recentGames = signal<any[]>([]);
  public popularGames = signal<any[]>([]);
  public countryRecommended = signal<any[]>([]);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        const allGames = this.games();
        if (allGames && allGames.length > 0) {
          // this.RecentGames();
          this.getRecommendations();
        }
      } else {
        this.recentGames.set([]);
        this.popularGames.set([]);
        this.countryRecommended.set([]);
      }
    });
  }

  showSpinner(): void {
    this.spinnerService.show();
  }

  hideSpinner(): void {
    this.spinnerService.hide();
  }

  manageStatus(status: Status) {
    if (status.code === 0) {
      this.toastr.success(status.message);
    }

    if (status.code === 1) {
      this.toastr.warning(status.message);
    }

    if (status.code === 2) {
      this.toastr.error(status.message, 'Error');
    }
  }



  getSport() {
    this.showSpinner();
    this.apiService.getSport().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.sport.set(res.data);
          this.hideSpinner();
        } else {
          this.manageStatus(res.status);
          this.hideSpinner();
        }
      }, error: (err: any) => {
        this.manageStatus(err.status);
        this.hideSpinner();
      }
    })
  }

  getGames() {
    this.showSpinner();
    this.apiService.getGames().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.games.set(res.data);
          this.hideSpinner();
        } else {
          this.manageStatus(res.status);
          this.hideSpinner();
        }
      }, error: (err: any) => {
        this.hideSpinner();
        this.manageStatus(err.error.status);
      }
    })
  }

  getProviders() {
    this.showSpinner();
    this.apiService.getProviders().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.providers.set(res.data);
          this.hideSpinner();
        } else {
          this.manageStatus(res.status);
          this.hideSpinner();
        }
      }, error: (err: any) => {
        this.hideSpinner();
        this.manageStatus(err.error.status);
      }
    })
  }

  getCategories() {
    this.showSpinner();
    this.apiService.getcategories().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.categories.set(res.data);
          this.hideSpinner();
        } else {
          this.manageStatus(res.status);
        }
      }, error: (err: any) => {
        this.hideSpinner();
        this.manageStatus(err.error.status);
      }
    })
  }

  // RecentGames() {
  //   const user = this.authService.currentUser();
  //   const player = {
  //     player_id: user?.id
  //   }
  //   this.showSpinner();
  //   this.apiService.getRecentGames(player).subscribe({
  //     next: (res: any) => {
  //       if (res && res.status.code === 0 && Array.isArray(res.data)) {
  //         const resolved = res.data.map((item: any) => {
  //           return this.games().find((g: any) => g.gid === item.gid);
  //         }).filter((g: any) => g !== undefined);
  //         this.recentGames.set(resolved);
  //       }
  //       this.hideSpinner();
  //     }, error: (err: any) => {
  //       this.hideSpinner();
  //       this.manageStatus(err.error.status);
  //     }
  //   })
  // }

  getRecommendations() {
    const user = this.authService.currentUser();
    const player = {
      player_id: user?.id
    }
    this.showSpinner();
    this.apiService.getRecommendations(player).subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0 && res.data) {
          const data = res.data;
          if (Array.isArray(data.recent_games)) {
            const resolvedRecentGames = data.recent_games.map((item: any) => {
              const found = this.games().find((g: any) => g.gid === item.game_id);
              if (found) return found;
              return {
                gid: item.game_id,
                gn: item.name,
                img: item.thumbnail,
                slug: item.slug,
                provider_id: item.provider_id
              };
            }).filter((g: any) => g !== undefined);
            this.recentGames.set(resolvedRecentGames);
          }
          if (Array.isArray(data.popular_games)) {
            const resolvedPopular = data.popular_games.map((item: any) => {
              const found = this.games().find((g: any) => g.gid === item.game_id);
              if (found) return found;
              return {
                gid: item.game_id,
                gn: item.name,
                img: item.thumbnail,
                slug: item.slug,
                provider_id: item.provider_id
              };
            }).filter((g: any) => g !== undefined);
            this.popularGames.set(resolvedPopular);
          }
          if (Array.isArray(data.country_games)) {
            const resolvedCountry = data.country_games.map((item: any) => {
              const found = this.games().find((g: any) => g.gid === item.game_id);
              if (found) return found;
              return {
                gid: item.game_id,
                gn: item.name,
                img: item.thumbnail,
                slug: item.slug,
                provider_id: item.provider_id
              };
            }).filter((g: any) => g !== undefined);
            this.countryRecommended.set(resolvedCountry);
          }
        }
        this.hideSpinner();
      }, error: (err: any) => {
        this.hideSpinner();
        this.manageStatus(err.error?.status || { code: 2, message: 'Failed to fetch recommendations' });
      }
    })
  }
}
