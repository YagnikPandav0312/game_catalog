import { inject, Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Status } from '../models/api.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
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

  playGame(game?: any): void {
    if (!this.authService.isLoggedIn() || !this.authService.getToken()) {
      this.toastr.warning('Please log in first to play games.');
      this.modalService.dismissAll();
      this.modalService.open(Login, { centered: true, backdrop: 'static' });
      return;
    }

    const gameTitle = game?.game_name || game?.sport_name || 'Game';
    this.toastr.info(`Launching ${gameTitle}... Have fun!`);
  }

}
