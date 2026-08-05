import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})

export class socket {

  public socket!: Socket;

  connect() {
    this.socket = io(
      'http://localhost:3000'
    );
  }

  disconnect() {
    this.socket.disconnect();
  }

}
