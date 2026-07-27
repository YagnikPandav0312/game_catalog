import { inject, Injectable, signal, effect, computed } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../models/api.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { API } from '../constants/api-endpoints';
import { AuthService } from './auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../../authentication/login/login';

@Injectable({
  providedIn: 'root',
})

export class Common {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public spinnerService = inject(NgxSpinnerService);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private modalService = inject(NgbModal);

  public sport = signal<any[]>([]);
  public games = signal<any[]>([]);
  public providers = signal<any[]>([]);
  public categories = signal<any[]>([]);
  public recentGames = signal<any[]>([]);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn()) {
        const allGames = this.games();
        if (allGames && allGames.length > 0) {
          this.RecentGames();
        }
      } else {
        this.recentGames.set([]);
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

  getCasinoHome(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.home_api.get_casino_home}`);
  }

  getSportHome(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.home_api.get_sport_home}`);
  }

  saveHistory(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${API.recent_games.save_history}`, data);
  }

  getRecentGames(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${API.recent_games.get_recent_games}`, data);
  }


  getSport() {
    this.showSpinner();
    this.getSportHome().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.sport.set(res.data.sports);
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

  getCasino() {
    this.showSpinner();
    this.getCasinoHome().subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0) {
          this.games.set(res.data.games);
          this.providers.set(res.data.providers);
          this.categories.set(res.data.categories)
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

  RecentGames() {
    const user = this.authService.currentUser();
    const player = {
      player_id: user?.id
    }
    this.showSpinner();
    this.getRecentGames(player).subscribe({
      next: (res: any) => {
        if (res && res.status.code === 0 && Array.isArray(res.data)) {
          const resolved = res.data.map((item: any) => {
            return this.games().find((g: any) => g.game_id === item.game_id);
          }).filter((g: any) => g !== undefined);
          this.recentGames.set(resolved);
        }
        this.hideSpinner();
      }, error: (err: any) => {
        this.hideSpinner();
        this.manageStatus(err.error.status);
      }
    })
  }
}
