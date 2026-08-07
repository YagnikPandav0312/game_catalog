import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class socket {
  public socket!: Socket;
  
  // Track connection status reactively
  private connected$ = new BehaviorSubject<boolean>(false);

  /**
   * Observable to subscribe to connection state changes
   */
  get isConnected$(): Observable<boolean> {
    return this.connected$.asObservable();
  }

  /**
   * Synchronous check for connection status
   */
  get isConnected(): boolean {
    return this.socket?.connected || false;
  }

  connect() {
    // If socket isn't initialized, create it.
    if (!this.socket) {
      this.socket = io('http://localhost:4000', {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      this.setupEventListeners();
    } else if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Socket.io connected successfully. ID:', this.socket.id);
      this.connected$.next(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket.io disconnected. Reason:', reason);
      this.connected$.next(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error.message);
      this.connected$.next(false);
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Socket.io reconnecting attempt: ${attempt}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Socket.io reconnection failed completely');
    });
  }

  trackActivity(playerId: number, gameId: number, countryId: number) {
    this.connect();
    if (this.socket) {
      this.socket.emit('track_activity', {
        playerId,
        gameId,
        countryId
      });
      console.log(`Socket emitted track_activity for player ${playerId}, game ${gameId}, country ${countryId}`);
    } else {
      console.error('Cannot track activity: Socket is not initialized.');
    }
  }
}
