import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private receivedMessagesSubject: Subject<any> = new Subject<any>();
  constructor() { }

  public connect(username: string): void {
    this.socket$ = webSocket(`ws://localhost:8090/chat?username=${username}`);
    this.socket$.subscribe(
      (message: any) => this.receivedMessagesSubject.next(message),
      (error: any) => console.error('WebSocket error:', error)
    );
  }

  public disconnect(): void {
    this.socket$.complete();
  }
  public getReceivedMessages(): Observable<any> {
    return this.receivedMessagesSubject.asObservable();
  }
  public sendMessage(sender: string, recipient: string, message: string): void {
    this.socket$.next({ sender, recipient, message }); // Include sender and recipient
  }

  public receiveMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}

