import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Common } from './common';

@Injectable({
  providedIn: 'root',
})

export class socket {

  private commonService = inject(Common);
  public socket!: Socket;

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:4000', {
        transports: ['websocket']
      });

      this.socket.on('player_recommendation', (res: any) => {
        console.log('player_recommendation received via socket:', res);
        if (res && res.status?.code === 0 && res.data) {
          this.commonService.updateRecommendationsState(res.data);
        }
      });

      this.socket.on('player_tracking_response', (data) => {
        console.log('player_tracking_response', data);
      });

      this.socket.on('player_tracking_error', (error) => {
        console.error('player_tracking__error', error);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  trackActivity(playerId: number, gameId: number, countryId: number) {
    this.connect();
    if (this.socket?.connected) {
      this.socket.emit('player_tracking', {
        playerId,
        gameId,
        countryId
      });
      console.log(`Socket emitted track_activity for player ${playerId}, game ${gameId}, country ${countryId}`);
    } else {
      console.error('Socket Not Connected Yet!!!');
    }
  }
}
