import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { API } from '../constants/api-endpoints';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Casino {

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getHome(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${API.home_api.get_home}`);
  }

}
