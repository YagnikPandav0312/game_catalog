import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})

export class Api {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getSport(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.sport_api.get_sport}`);
  }

  saveHistory(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${API.recent_games.save_history}`, data);
  }

  getRecentGames(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${API.recent_games.get_recent_games}`, data);
  }

  getGames(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.games_api.get_games}`);
  }

  getProviders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.providers_api.get_providers}`);
  }

  getcategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.categories_api.get_categories}`);
  }

}
