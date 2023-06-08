import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckSessionService {
  private username: string;
  private recipient: string;

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  setRecipient(recipient: string): void {
    this.recipient = recipient;
  }

  getRecipient(): string {
    return this.recipient;
  }
}
