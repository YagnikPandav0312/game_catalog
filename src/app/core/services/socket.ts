import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class socket {

  public socket!: Socket;

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:4000', {
        transports: ['websocket']
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
