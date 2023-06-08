import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
    <h2 mat-dialog-title>Celebrating 30 Points</h2>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      
    </div>
  `,
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}